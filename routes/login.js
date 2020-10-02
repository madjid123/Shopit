const router = require('./Router')

var path = require('path');
const session = require('express-session')

const bcrypt = require('bcrypt');
const expressValidator = require('express-validator');

var sqlite = require('sqlite3').verbose()

const DbPath = require('../DbPath')

console.log(DbPath)

router.post('/log-in', (req, res) => {
  const { email, password } = req.body

  var db = new sqlite.Database(DbPath, (err) => {

    if (err) console.error(err)
    else console.log(`Connected succesfully to the data base !`)
  })

  let SqlInstruction =
    'SELECT email , password, firstname ,lastname FROM User WHERE email = ? ';
  db.get(SqlInstruction, email, (err, row) => {
    if (row == undefined) {
      console.log({ row })
      res.render(
        'log-in', { msg: 'Email address doesn\'t exist.' })
      if (err) console.error(err.message);
    } else {
      if (bcrypt.compareSync(password, row.password)) {
        req.session.user = row.firstname + ' ' + row.lastname
        res.redirect('/')
      } else {
        res.render('.log-in', { msg: 'Incorrect password' })
      }
    }
  })
})
router.get('/log-in', (req, res) => {
  res.render('log-in', { title: ' log-in', msg: '' });
})
module.exports = router
