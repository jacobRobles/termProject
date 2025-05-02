const express = require('express');
const router = express.Router();
const path = require('path');

// Home page
router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/home.html'));
});

// Login page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Sign-in page 
router.get('/sign-in', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/sign-in.html'));
});

// Payment page
router.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/payment.html'));
});

module.exports = router;
