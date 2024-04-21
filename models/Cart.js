const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Item",
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
