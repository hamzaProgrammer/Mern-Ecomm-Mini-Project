const express = require('express');
const router = express.Router();
const {
    addProduct,
    updateProduct,
    deleteProduct,
    getSingleProductInfo,
    getAllProduct
} = require('../controllers/ProductController')

// create Product
router.post('/products/addNew', addProduct)

// Update Product
router.put('/products/update/:userId', updateProduct)

// Delete Product
router.delete('/products/deleteProduct/:id', deleteProduct)

// Get Single Product
router.get('/products/getSingleProduct/:id', getSingleProductInfo)

// Get All products
router.get('/products/', getAllProduct)

module.exports = router;