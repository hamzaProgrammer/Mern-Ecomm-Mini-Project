const express = require('express');
const router = express.Router();
const {
        updateUser,
        deleteUser,
        getSingleUserInfo,
        getAllUser
    } = require('../controllers/UserController')


// Update User
router.put('/users/update/:userId', updateUser)

// Delete user
router.delete('/users/deleteUser/:id', deleteUser)

// Get Single User
router.get('/users/getSingleUser/:id', getSingleUserInfo)

// Get All Users
router.get('/users/', getAllUser)

module.exports = router;