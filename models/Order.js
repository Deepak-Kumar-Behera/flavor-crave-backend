const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true,
        },
        itemId: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        orderType: {
            type: Number,
            required: true,
        },
        status: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true}
);

module.exports = mongoose.model("Order", orderSchema);