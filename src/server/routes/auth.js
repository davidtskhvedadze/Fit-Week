// authRoutes.js

const express = require('express');
const router = express.Router();
const {
    createUser,
    verifyUser
} = require('../controllers/userController');

// Signup route
router.post('/signup', createUser);

// Login route
router.post('/login', verifyUser);

module.exports = router;
