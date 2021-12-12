const Product = require('../model/ProductSchema')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken');

// create Product
const addProduct = async(req,res) => {
    const newProduct = new Product(req.body)
    console.log("Recived", req.body)
    try {
        await newProduct.save();

        res.status(201).json({
            newProduct
        })
    } catch (error) {
        console.log("Error in addProduct and error is : ", error)
    }
}

// Updating Product Info
const updateProduct = async (req, res) => {
    const { userId } = req.params;

    //if (req.userId){
        try {
            const updatedUser = await Product.findByIdAndUpdate(userId ,{ $set: req.body } , {new: true} )

            res.status(201).json({updatedUser , message: ''})
        } catch (error) {
            res.status(201).json({ message: '!!! Opps An Error Occured !!!'})
            console.log("Error in updateProduct and error is : ", error)
        }
    //}else{
        //res.status(403).json({message: "You Are Not Allowed to Update Admin!!!" })
    //}

}

// Deleteing Product
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    //if (req.userId){

        try {
            await Product.findByIdAndDelete(id)

            res.status(201).json({message: "Product has been DELETED"})
        } catch (error) {
            console.log("Error in deleteProduct and error is : ", error)
        }
    //}else{
        //res.status(404).json({message: "You Are Not Allowed to Delete Your Admin" })
    //}

}


// Getting Single  Product
const getSingleProductInfo = async (req ,res) => {
    const { id } = req.params;

    //if (req.userId === id || req.isAdmin){

        try {
            const gotProduct = await Product.find({_id: id} , {password: 0 })

            res.status(201).json({gotProduct})
        } catch (error) {
            console.log("Error in getSingleProductInfo and error is : ", error)
        }
    //}else{
        //res.status(403).json({message: "You Are Not Allowed to Delete Your Account" })
    //}

}


// Getting All  Product
const getAllProduct = async (req, res) => {
    //if (req.userId === id || req.isAdmin){
        const qNew = req?.query?.new
        const qCategory = req?.query?.category

        try {
            let products;

            if(qNew){
                products = await Product.find().sort({createdAt: -1}).limit(5);
            }else if(qCategory){
                products = await Product.find({categories: {
                    $in: [qCategory]
                }});
            }else{
                products = await Product.find();
            }
            const gotProducts = await Product.find()

            res.status(201).json({allProducts : gotProducts })
        } catch (error) {
            console.log("Error in getAllProduct and error is : ", error)
        }
    //}else{
        //res.status(403).json({message: "You Are Not Allowed to Delete Your Account" })
    //}

}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getSingleProductInfo,
    getAllProduct
}