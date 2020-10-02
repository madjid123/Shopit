const Router = require('express').Router()
var path = require('path');
const session = require('express-session')
const bcrypt = require('bcrypt');
const expressValidator = require('express-validator');

Router.use(session({
    secret: "123456",
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 6000000000000
    }
}))

Router.get('/cart', (req, res) => {
    res.render('cart')
})
Router.get('/logout', (req, res) => {

    req.session.destroy()
    console.log("session destroyed")
    res.render('home', { title: " Home" });

})

Router.get('/', (req, res) => {

    var user
    if (req.session.user != undefined) user = req.session.user


    res.render('home', { title: " Home", user: user });

});




module.exports = Router
