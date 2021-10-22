const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

//Create SQlite database connection
const sqlite = require('sqlite3').verbose();
let db = new sqlite.Database(':memory:', (err) => {
    if(err){
        return console.error(err.message);
    }
});

//Create database tables
db.serialize(()=>{
    db.run("CREATE TABLE user_info_basic (first_name TEXT NOT NULL, middle_name TEXT, last_name TEXT NOT NULL, email TEXT NOT NULL PRIMARY KEY, password TEXT NOT NULL, phone_number TEXT, dob TEXT)");
    db.run("CREATE TABLE user_info_trading (balance REAL NOT NULL, email TEXT NOT NULL PRIMARY KEY)");
});

//Close the database connection
db.close((err=>{
    if(err){
        return console.error(err.message);
    }
}));
//const passport = require('passport');
//const flash = require('connect-flash');
//const session = require('express-session');



// Passport Config
//require('./config/passport')(passport);

// DB Config
//const db = require('./config/keys').mongoURI;

// Connect to MongoDB
// mongoose
//   .connect(
//     db,
//     { useNewUrlParser: true ,useUnifiedTopology: true}
//   )
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// Express JS middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
// app.use(
//   session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
//   })
// );

// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// Connect flash
// app.use(flash());

// Global variables
// app.use(function(req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   next();
// });


//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

//Set up port
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
