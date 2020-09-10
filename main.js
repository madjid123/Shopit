const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const fs = require('fs')

// Body parser use JSON data(useless in this case)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
// set the View engine
app.set('view engine', 'pug')

// using all the routes in /routes.
fs.readdir('./routes', (err, data) => {
  if (err) console.log(err);
  data.filter((file) => {
    //removes the .js extension Ex : (sigin.js => sigin).
    file = file.slice(0, file.length - 3)
    app.use(require('./routes/' + file, (res, req, next) => {
      next();
    }))

  })
})
// reading the name of files in routes and including them to express.
// app.use(require('./routes/Router'), (res, req, next) => {
//   next();
// });
// app.use(require('./routes/login'), (res, req, next) => {
//   next();
// });
// app.use(require('./routes/signin'), (res, req, next) => {
//   next();
// });

// adding static files aka css and media to express
app.use(express.static(__dirname + '/templates/css'))
app.set('views', __dirname + '/views')


// PORT value
var PORT = process.env.PORT || 5000

app.listen(PORT)


if (!process.env.PORT)
  console.log('http://localhost:' + PORT + '/')
else
  console.log(`PORT : ${PORT}`)

