const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
// const validator = require('validator'); // was used in user task!
const ProductSchema = mongoose.Schema(
    {
        name: {
            unique: true,
            type: String,
            required: [true, "Please enter product's name"]
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);


const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;