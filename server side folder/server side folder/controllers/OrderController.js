const Orders = require('../model/OrderSchema')

// saving order
const addOrderItem = async (req,res) => {
    const {
        orderItems,
        shippingAddrress,
        paymentMethod,
        totalPrice,
        userId
    } = req.body;

    if(orderItems && orderItems.length === 0){
        return res.status(500).json({message : "Error!!!  Order Items are Not Found "})
    }else{
        const order = new Orders({
                orderItems,
                shippingAddrress,
                paymentMethod,
                totalPrice,
                userId
        });

        const createdOrder = await order.save();
        res.status(200).json(createdOrder)
    }
}


// getting all user orders
const getmyAllOrders = async (req,res) => {
    const { id } = req.params;

    try {
        const gotOrders = await Orders.find({userId : id});

        res.status(200).json({gotOrders})
    } catch (error) {
        console.log("Error in getmyAllOrders and error is : ", error)
    }
}


// getting all  orders
const getAllOrders = async (req, res) => {

    try {
        const gotOrders = await Orders.find();

        res.status(200).json({gotOrders})
    } catch (error) {
        console.log("Error in getAllOrders and error is : ", error)
    }
}



// getting Single orders
const getSingleOrder = async (req,res) => {
    const { id } = req.params;
    try {
        const gotOrders = await Orders.find({_id : id});

        res.status(200).json({gotOrders})
    } catch (error) {
        console.log("Error in getSingleOrder and error is : ", error)
    }
}


// Updating Single orders
const updateSingleOrder = async (req,res) => {
    const { id } = req.params;

    try {
        const gotOrders = await Orders.findByIdAndUpdate(id ,{ $set: req.body } , {new: true} )

        res.status(200).json({gotOrders})
    } catch (error) {
        console.log("Error in updateSingleOrder and error is : ", error)
    }
}


// Deleting Single order
const deleteThisOrder = async (req,res) => {
    const { id } = req.params;

    try {
        await Orders.findByIdAndDelete(id)
        const gotOrders = await Orders.find();

        res.status(200).json({gotOrders})
    } catch (error) {
        console.log("Error in deleteThisOrder and error is : ", error)
    }
}

module.exports = {
    addOrderItem,
    getmyAllOrders,
    getSingleOrder,
    updateSingleOrder,
    getAllOrders,
    deleteThisOrder
}