const express = require('express')
const bodyParser = require('body-parser')

const passwordHach = require('password-hash')

const Database = require('./Database')
var Db = new Database('ShopIt.Db')                   
Db.serialize(() => {
                      var CreateUserTable ="CREATE TABLE IF NOT EXISTS User(id INTEGER PRIMARY KEY AUTOINCREMENT,firstname TEXT NON NULL,lastname TEXT NON NULL ,email TEXT NON NULL ,password TEXT NON NULL);" 
                      Db.run(CreateUserTable ,(err) => {if(err) console.error(err.message)})
                   }
            );

const app = express()

app.use(bodyParser.json()); // Body parser use JSON data
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug')

var login = false
app.get('/', (req,res) =>{                        
                            res.render(__dirname + '/templates/home', {title: " Home", login : login});
                         }
   );
app.get('/about', (req,res) => {
                                    res.render(__dirname + '/templates/about',{title: " About", login : login});
                               }
        );
app.get('/explore', (req,res) =>{
                                    res.render(__dirname + '/templates/explore',{title: " Explore",login : login});
                                }
        );
        
var  SignInMssg = ""
app.get('/sign-in',(req,res) => {
                                  res.render(__dirname + '/templates/sign-in',{title: " Sign-in",msg :SignInMssg});
                                }
       )        
app.post('/sign-in', (req,res) =>{      
                                        let verifyData = "SELECT firstname ,lastname, email FROM User WHERE firstname = ? OR lastname = ? OR email = ? ;"
                                        Db.all(verifyData,[req.body.firstname,req.body.lastname,req.body.email],(err,row) => { 
                                                if(err) console.error(err.message)
                                                
                                                if (Object.keys(row).length === 0){
                                                        var data = [
                                                                        req.body.firstname ,
                                                                        req.body.lastname,
                                                                        req.body.email,
                                                                        req.body.password
                                                                   ]
                                                        let Inserted =  Db.InsertIntoUser(data)
                                                        if(Inserted){
                                                                 SignInMssg = "Seccesfully Sign-in"
                                                        }
                                                        // let insert = "INSERT INTO User ( firstname ,lastname, email, password ) VALUES ( ?,?,?,? ) ;" 
                                                
                                                        //  Db.run(insert,data,(err,row) => {
                                                        //                                      if (err) 
                                                        //                                         console.error(err.message)
                                                        //                                      else{
                                                        //                                         SignInMssg = "Seccesfully Sign-in"
                                                        //                                      } 

                                                                                                        
                                                        //                                 }
                                                        //         )
                                                        
                                                }
                                                else{
                                                        
                                                        SignInMssg = 'This informations was given by a previous user. Please try with a new one'
                                                }
                                        })           
                                
                                 res.render(__dirname + '/templates/sign-in',{title: " Sign-in", msg : SignInMssg });
                                }
        ); 

var logInMssg = ""
app.get('/log-in', (req,res) =>{ 
                                    res.render(__dirname + '/templates/log-in',{title: " log-in", msg : logInMssg});
                                }
        );

app.post('/log-in', (req,res) =>{ 
                
                Db.all("SELECT email , password FROM User WHERE email = ? ",req.body.email,(err,row) =>{   
                                                                                                                if (err) throw err
                                                                                                                
                                                                                                               console.log({row})
                                                                                                                if(Object.keys(row).length === 0 ) {
                                                                                                                        logInMssg = "This email address doesn't exist." 
                                                                                                                       
                                                                                                                }else{
                                                                                                                        
                                                                                                                   if (req.body.password === row[0].password ){
                                                                                                                           logInMssg = "Seccesfully log-in.";   
                                                                                                                           login = true;              
                                                                                                                   }else{
                                                                                                                           logInMssg = "Incorrect Password please try again."
                                                                                                                                
                                                                                                                        }   
                                                                                                                }  
                                                                                                                
                                                                                                        }
                        )
                        res.render(__dirname + '/templates/log-in', {msg : logInMssg});
                         }
        )

app.get('/style.css', (req,res) =>{
                                     res.sendFile(__dirname + '/templates/style.css');
                                  }
        );        

var PORT =  5000

app.listen(PORT)

console.log(`Server running in PORT : ${PORT}`)
