const express = require('express');
const router = express.Router();


// Home page
router.get('/', (req, res) => {
  res.render('index');
});

// FAQ page
router.get('/faq', (req, res) => {
  res.render('faq');
});

// Login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Payment page
router.get('/payment', (req, res) => {
  res.render('payment');
});

// products page
router.get('/products', (req, res) => {
  res.render('products');
});

// Profile page
router.get('/profile', (req, res) => {
  res.render('profile');
});

// Sign-in page
router.get('/sign-in', (req, res) => {
  res.render('sign-in');
});

module.exports = router;