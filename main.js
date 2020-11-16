const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const fs = require('fs')
const db = require('./routes/Router').db
// Body parser use JSON data(useless in this case)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
// set the View engine
app.set('view engine', 'pug')
app.engine('pug', require('pug').__express)


// using all the routes in /routes.
fs.readdir('./routes', (err, data) => {
  if (err) console.log(err);
  data.filter((file) => {
    //removes the .js extension from the filename Ex : (sigin.js => sigin).
    file = file.slice(0, file.length - 3)
    app.use(require('./routes/' + file), (res, req, next) => {
      next();
    })

  })
})


// adding static files aka css and media to express
app.use(express.static(__dirname + '/templates/css'))
app.use(express.static(path.join(__dirname, "/templates")))
app.set('views', path.join(__dirname, 'templates/views'))


// PORT value
var PORT = process.env.PORT || 5000

var server = app.listen(PORT, () => {


}
)

console.log(server.address())
console.log(` listening at http://localhost:${PORT}`)




process.on('SIGINT', () => {
  db.close();
  server.close();
});