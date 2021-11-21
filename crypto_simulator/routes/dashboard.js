const express = require('express');
const router = express.Router();
const db = require('../database/dbFunctions');
const cgecko = require('coingecko-api');
const { default: axios } = require('axios');
var current_id;



//Get user information
router.get('/', function(req, res, next) {
    let userInfo = req.user;
    console.log(req.user);

    current_id = req.user.email;
    console.log("Here: %s",current_id);
    
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false").then(function(response){
        let object = response.data[0].current_price;
        console.log(object);
        res.render('dashboard', {userInfo, object});
    }).catch(function(error){
        console.log(error);
    })



    
});

//Get the update account page
router.get('/updateAccount', (req, res) => res.render('updateAccount'));

//Get the update account page
router.get('/updateAccount', (req, res) => res.render('updateAccount'));

//Handle deleting
// router.post('/', async function(res,req,next){
//     console.log(current_id);
//     await db.deleteUser(current_id);
//     res.redirect('./');
// })

//Handle the account updating
router.post('/updateAccount', async (req, res, next) => {
    const{oldemail, newemail} = req.body;
    let errors = [];
    let someval = await db.verifyUser(oldemail);
    if(someval == undefined)
    {
        errors.push({msg: 'Old email does not exist.'});
    }
    if(errors.length > 0)
    {
        res.render('updateAccount',{
            errors, oldemail, newemail
        });
    }
    else
    {

        await db.updateEmail(oldemail, newemail);
        console.log("UPDATED EMAIL!!")
        res.redirect('./');
      
    }
});



module.exports = router;