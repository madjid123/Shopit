const Router = require('./Router').Router
const ExpVal = require('express-validator')

Router.get('/adminLogin', (req, res) => {
    res.render('adminLogin')
})

Router.get('/ad-logout', (req, res) => {
    req.session.admin = undefined
    res.redirect('/')
})
Router.post('/adminLogin', (req, res) => {
    let [name, pass] = [req.body.name, req.body.password]
    // I will move them later to the database,
    if (name === 'madjid' && pass === '123456') {
        console.log("madijd")
        req.session.admin = "madjid"
        res.redirect('admin')
    } else {
        res.render("adminLogin", { err: "name doesn't exist or incorrect password" })
    }

})
