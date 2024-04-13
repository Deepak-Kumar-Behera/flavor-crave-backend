const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            enum: ['Breakfast', 'Lunch', 'Dinner'],
            required: true,
        },
        noOfGuests: {
            type: Number,
            required: true,
        },
        message: {
            type: String,
            trim: true,
        },
        tableNumber: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: true,
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Table", tableSchema);