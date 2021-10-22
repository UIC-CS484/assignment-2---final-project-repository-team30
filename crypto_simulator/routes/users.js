const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
//Create SQlite database connection
const sqlite = require('sqlite3').verbose();
let db = new sqlite.Database(':memory:', (err) => {
    if(err){
        return console.error(err.message);
    }
    console.log('Connected to the cached SQlite database.');
});



// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

//Handle registration
router.post('/register', (req,res) => {
    const{ first_name, middle_name, last_name, email, password, password2} = req.body;
    let errors = [];

    //Check required fields
    if(!first_name){
        errors.push({msg: 'Please enter your first name.'})
    }
    if(!last_name){
        errors.push({msg: 'Please enter your last name.'})
    }
    if(!email){
        errors.push({msg: 'Please enter your email.'})
    }
    if(!password){
        errors.push({msg: 'Please enter a password.'})
    }
    if(!password2){
        errors.push({msg: 'Please confirm your password.'})
    }
    if(password != password2){
        errors.push({msg: 'Passwords do not match.'})
    }
    if(password.length < 8){
        errors.push({msg: 'Password should be at least 8 characters.'})
    }

    //Check if registration form should be sent or reloaded
    if(errors.length > 0)
    {
        res.render('register',{
            errors, first_name, middle_name, last_name, email, password, password2
        });
    }
    else{

        db.serialize(()=>{
            let found = false;
            db.each(`SELECT email FROM user_info_basic WHERE email = ${email}`,(err,row) => {
                if(err){
                    return console.error(err.message);
                }
                if (row.email == email)
                {
                    found = true;
                }
            });
            if (found == true)
            {
                errors.push({ msg: 'Email is already registered'});
                res.render('register',{
                    errors, first_name, middle_name, last_name, email, password, password2
                });
            }
            else {
                //db.run(`INSERT INTO user_info_basic(first_name, middle_name, last_name, email, password)`)
                console.log(email);

                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(password, salt, (err, hash) => {
                    if(err) throw err;
                    
                } ) )
            }
        });

    }

});
// Dashboard
// router.get('/dashboard', ensureAuthenticated, (req, res) =>
//   res.render('dashboard', {
//     user: req.user
//   })
// );


//Create database tables
// db.serialize(()=>{
//     db.run("CREATE TABLE user_info_basic (first_name TEXT NOT NULL, middle_name TEXT, last_name TEXT NOT NULL, email TEXT NOT NULL PRIMARY KEY, password TEXT NOT NULL, phone_number TEXT, dob TEXT)");
//     db.run("CREATE TABLE user_info_trading (balance REAL NOT NULL, email TEXT NOT NULL PRIMARY KEY)");
// })
//db.run("CREATE TABLE user_info_basic (first_name TEXT NOT NULL, middle_name TEXT, last_name TEXT NOT NULL, email TEXT NOT NULL PRIMARY KEY, password TEXT NOT NULL, phone_number TEXT, dob TEXT)");
     

//Close the database connection
db.close((err=>{
    if(err){
        return console.error(err.message);
    }
    console.log('Disconnected from the cached SQlite database.');
}))


module.exports = router;