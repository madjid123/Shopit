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
        expires: 600000
    }
}))

Router.get('/logout', (req, res) => {

    req.session.destroy()
    console.log("session destroyed")
    res.render('../templates/views/home', { title: " Home" });

})

Router.get('/', (req, res) => {

    var user
    if (req.session.user != undefined) user = req.session.user


    res.render('../templates/views/home', { title: " Home", user: user });

});

Router.get('/about', (req, res) => {
    res.render('../templates/views/about', { title: " About", user: req.session.user });
}
);
Router.get('/explore', (req, res) => {
    res.render('../templates/views/explore', { title: " Explore", user: req.session.user, explore: 'exp' });
}
);

module.exports = Router
