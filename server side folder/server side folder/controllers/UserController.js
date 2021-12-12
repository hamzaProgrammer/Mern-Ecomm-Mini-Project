const Users = require('../model/UserSchema')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken');

// Updating User Info
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const {password  } = req.body

    //if (req.userId){
        try {
            if(password){
                req.body.password = await bcrypt.hash(password, 12); // hashing password
            }

            const updatedUser = await Users.findByIdAndUpdate(userId ,{ $set: req.body } , {new: true} )

            res.status(201).json({updatedUser , message: ''})
        } catch (error) {
            res.status(201).json({ message: '!!! Opps An Error Occured !!!'})
            console.log("Error in updateUser and error is : ", error)
        }
    //}else{
        //res.status(403).json({message: "You Are Not Allowed to Update Admin!!!" })
    //}

}

// Deleteing Movie
const deleteUser = async (req, res) => {
    const { id } = req.params;

    //if (req.userId){

        try {
            await Users.findByIdAndDelete(id)

            res.status(201).json({message: "User has been DELETED"})
        } catch (error) {
            console.log("Error in deleteUser and error is : ", error)
        }
    //}else{
        //res.status(404).json({message: "You Are Not Allowed to Delete Your Admin" })
    //}

}


// Getting Single  User Account
const getSingleUserInfo = async (req ,res) => {
    const { id } = req.params;

    //if (req.userId === id || req.isAdmin){

        try {
            const gotUser = await Users.find({_id: id} , {password: 0 })

            res.status(201).json({gotUser})
        } catch (error) {
            console.log("Error in getSingleUserInfo and error is : ", error)
        }
    //}else{
        //res.status(403).json({message: "You Are Not Allowed to Delete Your Account" })
    //}

}


// Getting Single  User Account
const getAllUser = async (req, res) => {
    //if (req.userId === id || req.isAdmin){

        try {
            const gotFreinds = await Users.find()

            res.status(201).json({allFriends : gotFreinds })
        } catch (error) {
            console.log("Error in getAllUser and error is : ", error)
        }
    //}else{
        //res.status(403).json({message: "You Are Not Allowed to Delete Your Account" })
    //}

}

module.exports = {
    updateUser,
    deleteUser,
    getSingleUserInfo,
    getAllUser
}