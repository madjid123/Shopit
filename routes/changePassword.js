
const { Router, db } = require('./Router')

var path = require('path');
const session = require('express-session')

const bcrypt = require('bcrypt');
const expressValidator = require('express-validator');

var sqlite = require('sqlite3').verbose()

//const { DbPath } = require('../Paths')


Router.post('/changepassword', (req, res) => {
  const {  password, user_id} = req.body
    console.log(user_id)

  var salt = bcrypt.genSaltSync(10);
  var hash= bcrypt.hashSync(password, salt);
  let SqlInstruction =
    'UPDATE User set password = ? WHERE id=  ? ';
  db.run(SqlInstruction, [hash,user_id], (err ) => {
      if (err) {
        console.error(err.message);
      res.render(
        'changepassword', { msg: err.message })
      return;
      }
    res.redirect("/")
  })
})
Router.get("/chpasswd",(req,res)=>{
    const {password , }= req.query
    const user_id = req.session.user_id

    var salt = bcrypt.genSaltSync(10);
    var hash= bcrypt.hashSync(password, salt);
    console.log(req.session)
    console.log(password)
    let SqlInstruction =
    'UPDATE User set password = ? WHERE id=  ? ';
    db.run(SqlInstruction, [hash,user_id], (err ) => {
        if (err) {
        console.error(err.message);
        res.render(
        'changepassword', { msg: err.message })
        return;
        }
        req.session.msg= "Password Changed Successfully"
        res.redirect("/changepassword")
        // res.render('changepassword', { title: 'change password',
        //                                user: req.session.user,
        //                                user_id:req.session.user_id, 
        //                                msg: 'Password Changed successfully' });
  })

})
Router.get('/changepassword', (req, res) => {
  if(req.session.user === undefined){
    return res.redirect("/log-in")
  }
  let msg = ""
  if(req.session.msg !=undefined){
        msg  = req.session.msg
    }


  res.render('changepassword', { title: 'change password',user: req.session.user, user_id:req.session.user_id, msg: msg });
})
module.exports = { Router, db }
