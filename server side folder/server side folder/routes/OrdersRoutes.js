const express = require('express');
const router = express.Router();
const {
        addOrderItem,
        getmyAllOrders,
        getSingleOrder,
        updateSingleOrder,
        getAllOrders,
        deleteThisOrder
    } = require('../controllers/OrderController')
//const verify = require('../middleware/verify')

// Updating  Order
router.put('/orders/updateOrder/:id', updateSingleOrder)

// Posting New Order
router.post('/order/postNewOrder' , addOrderItem)

// Getting user Orders
router.get('/orders/myOrders/:id', getmyAllOrders)

// Getting ALL Orders
router.get('/orders/allOrders', getAllOrders)


// Getting Single Order
router.get('/orders/getSingle/:id', getSingleOrder)


// Deleting This  Orders
router.delete('/orders/deleteOrder/:id', deleteThisOrder)


module.exports = router;