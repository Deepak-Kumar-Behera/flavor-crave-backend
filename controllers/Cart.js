const Cart = require("../models/Cart");

//add to cart
exports.addToCart = async (req, res) => {
  try {
    // fetch data
    let { userId, itemId, quantity } = req.body;

    console.log(userId, itemId, quantity);

    // validate data
    if (!userId || !itemId || !quantity) {
      return res.json({
        responseCode: 500,
        message: "All fields are required",
        data: null,
      });
    }

    // create entry in DB
    const cart = await Cart.create({
      userId,
      itemId,
      quantity,
    });

    // response
    return res.json({
      responseCode: 200,
      message: "Add to cart successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      responseCode: 500,
      message: "Something went wrong",
      data: null,
    });
  }
};

//show cart

exports.showCart = async (req, res) => {
  try {
    // fetch data
    let { userId } = req.body;

    // validate data
    if (!userId) {
      return res.json({
        responseCode: 500,
        message: "All fields are required",
        data: null,
      });
    }

    // fetching all cart data of this user
    const cart = await Cart.find({
      userId,
    });

    // response
    return res.json({
      responseCode: 200,
      message: "Cart data fetched successfully",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      responseCode: 500,
      message: "Something went wrong",
      data: null,
    });
  }
};

//remove item
exports.removeItem = async (req, res) => {
  try {
    // fetch data
    let { userId, itemId } = req.body;

    // validate data
    if (!userId || !itemId) {
      return res.json({
        responseCode: 500,
        message: "All fields are required",
        data: null,
      });
    }

    // removing item from cart
    const cart = await Cart.findOneAndDelete({
      userId,
      itemId,
    });

    // response
    return res.json({
      responseCode: 200,
      message: "item removed",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      responseCode: 500,
      message: "Something went wrong",
      data: null,
    });
  }
};
