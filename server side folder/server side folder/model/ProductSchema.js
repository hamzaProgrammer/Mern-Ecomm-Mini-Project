const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type : String,
            required: true,
            unique: true
        },
        desc: {
            type: String,
            required: true,
        },
        image: {
            type : String,
            required: true,
        },
        sizes: {
            type : Array,
            required: true,
        },
        colors: {
            type: Array,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
        },
        numReviews: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        inStock: {
            type: Number,
        },
        date: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);


const Products = mongoose.model('PRODUCT', ProductSchema);

module.exports = Products