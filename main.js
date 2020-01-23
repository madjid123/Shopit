const express = require('express')
const bodyParser = require('body-parser')





const app = express()


app.use(bodyParser.json()); // Body parser use JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug')
app.use(express.static(__dirname + '/templates'));
app.use(require('./routes/Router'))



var PORT = 5000

app.listen(PORT)

console.log(`Server running in PORT : ${PORT}`)
