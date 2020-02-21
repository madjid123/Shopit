const Router = require('express').Router()
var path = require('path');
const session = require('express-session')
const Database = require('../Database')
const bcrypt = require('bcrypt');
var Db = new Database("ShopIt.db")


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
    res.render('../templates/home', { title: " Home" });

})

Router.get('/', (req, res) => {

    var user
    if (req.session.user != undefined) user = req.session.user


    res.render('../templates/home', { title: " Home", user: user });

}
);

Router.get('/about', (req, res) => {
    res.render('../templates/about', { title: " About" });
}
);
Router.get('/explore', (req, res) => {
    res.render('../templates/explore', { title: " Explore" });
}
);

var SignInMssg = ""
Router.get('/sign-in', (req, res) => {
    res.render('../templates/sign-in', { title: " Sign-in", msg: SignInMssg });
}
)
Router.post('/sign-in', (req, res) => {
    let verifyData = "SELECT firstname ,lastname, email FROM User WHERE firstname = ? OR lastname = ? OR email = ? ;"
    Db.all(verifyData, [req.body.firstname, req.body.lastname, req.body.email], (err, row) => {

        if (err) console.error(err.message)

        //hash the plain-text password.
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        console.log(hash)

        if (Object.keys(row).length === 0) {
            with (req.body) {
                var data = [
                    firstname,
                    lastname,
                    email,
                    hash
                ]
            }
            let Inserted = Db.InsertIntoUser(data)
            if (Inserted) {

                SignInMssg = "Seccesfully Sign-in"
                res.redirect('/log-in')
                return
            }

        }
        else SignInMssg = 'This informations was given by a previous user. Please try with a new one'
    })

    res.render('../templates/sign-in', { title: " Sign-in", msg: SignInMssg });
}
);

var logInMssg = ""

Router.post('/log-in', (req, res) => {
    let logInMssg = ""

    const { email, password } = req.body

    let SqlInstruction = "SELECT email , password, firstname ,lastname FROM User WHERE email = ? ";
    Db.all(SqlInstruction, email, (err, row) => {
        if (err) throw err

        console.log({ row })
        if (Object.keys(row).length === 0) {
            logInMssg = "Email address doesn't exist."

        } else {

            if (bcrypt.compareSync(password, row[0].password)) {
                req.session.user = row[0].firstname + ' ' + row[0].lastname
                res.redirect('/')
            } else {
                logInMssg = "Incorrect data"
                res.redirect('/log-in')

            }
        }

    })
});
Router.get('/log-in', (req, res) => {
    res.render('../templates/log-in', { title: " log-in", msg: logInMssg });
})


module.exports = Router
