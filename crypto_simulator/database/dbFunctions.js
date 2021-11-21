var sqlite3 = require('sqlite3').verbose() 
var deasync = require('deasync');
const bcrypt = require('bcrypt');
const util = require('util');

//Instantiating the persistent sqlite3 database
let db = new sqlite3.Database('./Database/userDB.sqlite3', (err) => {
    if (err)
    {
      console.error(err.message)
      throw err
    }
    else
    {   
      console.log('Connected to sqlite3 database.') 
    }
});

//Promisifying citical database operations
db.run = util.promisify(db.run);
db.all = util.promisify(db.all);

//Checking if a user is already registered
async function verifyUser(email){
    return await new Promise((resolve,reject)=>{
      db.get("SELECT * FROM basicuser WHERE email =?", String(email), (err, row) => {
        if(err)
        {
          reject(err)
        }
        resolve(row)
      });
    });
}

//Add a new user to the database
let createUser = async (first_name, last_name, middle_name, email, password, date_joined) =>{
	var insertUser = 'INSERT INTO basicuser (id, fname, mname, lname, email, password, datejoined) VALUES (?,?,?,?,?,?,?)';
	var encrypted_password = bcrypt.hashSync(password, 10);
	var params =[null, first_name, last_name, middle_name, email, encrypted_password, date_joined];
	await creationHelper(insertUser, params);
	return;
}

//Helper function to run a query that inserts a new user into the database
async function creationHelper(sqlQuery, params){
	db.run(sqlQuery, params, function (err) {
		if (err) 
        {
			return console.log(err.message);
		}
		console.log("User Created");
		console.log(`Rows inserted ${this.changes}`);
	});
	return console.log("User added to database.");
}




module.exports = {createUser, verifyUser}


