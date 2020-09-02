const express = require('express')
const bodyParser = require('body-parser')
const DbPath = `foo`
const app = express()

// Body parser use JSON data(useless in this case)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// set the View engine
app.set('view engine', 'pug')

// using all the routes in /routes.

// reading the name of files in routes and including them to express.
app.use(require('./routes/Router'), (res, req, next) => {
  next();
});
app.use(require('./routes/login'), (res, req, next) => {
  next();
});
app.use(require('./routes/signin'), (res, req, next) => {
  next();
});

// adding static files aka css and media to express
app.use(express.static(__dirname + '/templates/css'))
app.set('views', __dirname + '/views')

server.listen()
// PORT value
var PORT = process.env.PORT || 5000

app.listen(PORT)

console.log(`Server is running on PORT : ${PORT}`)
console.log('http://localhost:' + PORT + '/')
