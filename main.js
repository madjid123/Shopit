const express = require('express')
const mongoose = require('mongoose')
const app = express()
 
app.set('view engine', 'pug')

app.get('/', (req,res) =>{
    res.render(__dirname + '/templates/home', {title: "ShopIt - Home"});
   });
app.get('/about', (req,res) =>{
    console.log(req.url)
    res.render(__dirname + '/templates/about');
   });
app.get('/explore', (req,res) =>{
    res.render(__dirname + '/templates/explore');
   }); 
app.get('/sign-in', (req,res) =>{
    res.render(__dirname + '/templates/sign-in');
   }); 
app.get('/log-in', (req,res) =>{ 
    res.render(__dirname + '/templates/log-in');
   });
app.post('/log-in', (req,res) =>{ 
    res.render(__dirname + '/templates/log-in');
   });        
app.get('/style.css', (req,res) =>{
    res.sendFile(__dirname + '/templates/style.css');
   });        

var PORT = process.env.PORT || 3000
app.listen(PORT)

console.log(`Server running in PORT : ${PORT}`)