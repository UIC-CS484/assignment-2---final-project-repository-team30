const express = require('express');
const router = express.Router();
//const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', (req, res) => res.send('login'));

// Register Page
router.get('/register', (req, res) => res.send('register'));

// Dashboard
// router.get('/dashboard', ensureAuthenticated, (req, res) =>
//   res.render('dashboard', {
//     user: req.user
//   })
// );

module.exports = router;