const express = require('express');
const router = express.Router();
const path = require('path');

// Home page route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Login page route
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Profile page route
router.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/profile.html'));
});

// Payment page route
router.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/payment.html'));
});

// FAQ page route
router.get('/faq', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/faq.html'));
});

module.exports = router;