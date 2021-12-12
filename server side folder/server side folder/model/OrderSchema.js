const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema(
    {
        userId: {
            ref: 'Users',
            type: mongoose.Schema.Types.ObjectId,
        },
        orderItems: [
            {
                name: {
                    type: String,
                    required: true
                },
                sentQty: {
                    type: Number,
                    required: true
                },
                image: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
            }
        ],
        shippingAddrress: {
            address: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            postCode: {
                type: Number,
                required: true
            },
            country: {
                type: String,
                required: true
            }
        },
        paymentMethod: {
            type: String,
            required: true
        },
        paymentRes: {
            id: {
                type: String
            },
            status: {
                type: String
            },
            updated_time: {
                type: String
            },
            email_address: {
                type: String
            },
        },
        // taxPrice: {
        //     type: Number,
        //     required: true,
        //     default: 0.0
        // },
        // shippingPrice: {
        //     type: Number,
        //     required: true,
        //     default: 0.0
        // },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false
        },
        paidAt: {
            type: Date
        },
        isDelivered: {
            type: String,
            default: 'Packing'
        },
        deliveedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);


const Orders = mongoose.model('ORDERS', OrderSchema);

module.exports = Orders