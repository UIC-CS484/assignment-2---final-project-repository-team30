const express = require('express');
const router = express.Router();
const db = require('../database/dbFunctions');
const cgecko = require('coingecko-api');
const { default: axios } = require('axios');
const Chart = require('chart.js');
var current_id;



//Get user information
router.get('/', function(req, res, next) {
    let userInfo = req.user;
    console.log(req.user);

    current_id = req.user.email;
    console.log("Here: %s",current_id);

    // new Chart(document.getElementById("bar-chart"), {
    //     type: 'bar',
    //     data: {
    //       labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    //       datasets: [
    //         {
    //           label: "Population (millions)",
    //           backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
    //           data: [2478,5267,734,784,433]
    //         }
    //       ]
    //     },
    //     options: {
    //       legend: { display: false },
    //       title: {
    //         display: true,
    //         text: 'Trading volumes'
    //       }
    //     }
    // });
    
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20cardano%2C%20ripple%2C%20solana&order=market_cap_desc&per_page=100&page=1&sparkline=false").then(function(response){
        let btcp = response.data[0].current_price;
        let btcm = response.data[0].market_cap;
        let ethm = response.data[1].market_cap;
        let solm = response.data[2].market_cap;
        let adam = response.data[3].market_cap;
        let xrpm = response.data[4].market_cap;
        console.log(adam);
        res.render('dashboard', {userInfo, btcp, btcm, ethm, solm, adam, xrpm});
    }).catch(function(error){
        console.log(error);
    })



    
});

//Get the update account page
router.get('/updateAccount', (req, res) => res.render('updateAccount'));

//Get the delete account page
router.get('/deleteAccount', (req, res) => res.render('deleteAccount'));



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

//Handle the account updating
router.post('/deleteAccount', async (req, res, next) => {
    const{email} = req.body;
    let errors = [];
    let someval = await db.verifyUser(email);
    if(someval == undefined)
    {
        errors.push({msg: 'Email does not exist.'});
    }
    if(errors.length > 0)
    {
        res.render('deleteAccount',{
            errors, email
        });
    }
    else
    {
        await db.deleteUser(email);
        console.log("Deleted!")
        res.redirect('./');
      
    }
});



module.exports = router;