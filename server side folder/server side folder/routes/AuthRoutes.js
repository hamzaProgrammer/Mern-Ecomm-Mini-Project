const express = require('express');
const router = express.Router();
const {
        addNewUser,
        LogInUser
    } = require('../controllers/AuthController')


// Sign Up User
router.post('/register', addNewUser)

// Sign In User
router.post('/signin', LogInUser)

module.exports = router;