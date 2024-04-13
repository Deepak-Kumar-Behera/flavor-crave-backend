const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        item: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Item",
        },
        time: {
            type: Date,
            required: true,
        }
    },
    { timestamps: true}
);

module.exports = mongoose.model("Order", orderSchema);