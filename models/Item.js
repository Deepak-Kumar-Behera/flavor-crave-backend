const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
        itemName: {
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
            type: String,
            enum: ["Veg", "Non Veg"],
            required: true,
        },
        tag: {
            type: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);