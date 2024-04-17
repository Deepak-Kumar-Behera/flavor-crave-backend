const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
        },
        dietType: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
            trim: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);