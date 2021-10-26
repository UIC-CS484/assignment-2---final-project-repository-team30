const express = require('express');
const router = express.Router();
//const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
    let userInfo = req.user;
    console.log(req.user);

    res.render('dashboard', {userInfo});
    
});

// Dashboard
// router.get('/dashboard', ensureAuthenticated, (req, res) =>
//   res.render('dashboard', {
//     user: req.user
//   })
// );

module.exports = router;