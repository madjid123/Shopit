const Router = require('express').Router()

var path = require('path');
const bcrypt = require('bcrypt');
const expressValidator = require('express-validator');
const DbPath = require('../DbPath');

var sqlite = require('sqlite3').verbose()



Router.get('/sign-in', (req, res) => {
  res.render('../templates/views/sign-in', {title: ' Sign-in'});
})
Router.post('/sign-in', (req, res) => {
  console.log('post sign-in')

  var db = new sqlite.Database(DbPath, (err) => {
    if (err)
      console.error(err)
      else console.log(`Connected succesfully to the data base !`)
  })
  let verifyData =
      'SELECT firstname ,lastname, email FROM User WHERE firstname = ? OR lastname = ? OR email = ? ;'
  db.all(
      verifyData, [req.body.firstname, req.body.lastname, req.body.email],
      (err, row) => {
        if (err) console.error(err.message)

          // hash the plain-text password.
          var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        if (Object.keys(row).length === 0) {
          with(req.body) {
            var data = [firstname, lastname, email, hash]
          }


          var sqlintructions =
              `INSERT INTO User (firstname, lastname, email,password) VALUES (?,?,?,?);`
          db.run(sqlintructions, data, (err, row) => {
            if (err) {
              console.error(err.message)

            } else {
              res.render(
                  '../templates/views/log-in', {msg: 'Successfully Sign-in'})
            }
          })
        } else {
          var SignInMssg =
              'This informations was given by a previous user. Please try again'
          res.render(
              '../templates/views/sign-in',
              {title: ' Sign-in', msg: SignInMssg});
        }
      }

  );
})
module.exports = Router