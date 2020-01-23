const Router = require('express').Router()

const session = require('express-session')
const Database = require('../Database')
var Db = new Database("ShopIt.db")




Router.use(session({
    secret: "123456",
    resave: true,
    saveUninitialized: true
}))



Router.get('/', (req, res) => {
    console.log(req.session)
    var user
    if (req.session.user) user = req.session.user
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

        if (Object.keys(row).length === 0) {
            with (req.body) {
                var data = [
                    firstname,
                    lastname,
                    email,
                    password
                ]
            }
            let Inserted = Db.InsertIntoUser(data)
            if (Inserted) {

                SignInMssg = "Seccesfully Sign-in"
                res.redirect('/log-in')
            }

        }
        else SignInMssg = 'This informations was given by a previous user. Please try with a new one'
    })

    res.render('../templates/sign-in', { title: " Sign-in", msg: SignInMssg });
}
);

var logInMssg = ""
Router.get('/log-in', (req, res) => {
    res.render('../templates/log-in', { title: " log-in", msg: logInMssg });
})

Router.post('/log-in', (req, res) => {
    logInMssg = ""
    const { email, password } = req.body
    let SqlInstruction = "SELECT email , password FROM User WHERE email = ? ";
    Db.all(SqlInstruction, email, (err, row) => {
        if (err) throw err

        console.log({ row })
        if (Object.keys(row).length === 0) {
            logInMssg = "Email address doesn't exist."

        } else {

            if (password === row[0].password) {
                req.session.user = row[0].email
                console.log(req.session.user)
                res.redirect('/')
            } else {
                logInMssg = "Incorrect data"

            }
        }

    })
});

Router.get('/style.css', (req, res) => {
    res.sendFile('../templates/style.css');
});
module.exports = Router