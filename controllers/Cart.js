const Cart = require("../models/Cart");
const Item = require("../models/Item");

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
    const cart = await Cart.find({ userId: userId });

    const itemIds = cart.map((item) => item.itemId);

    const items = await Item.find({ _id: { $in: itemIds } });

    //   console.log(cart);
    console.log(items);

    //   const mergedArray = [];

    // // Merge quantity of first array
    const quantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);

    // // Add merged quantity to each item in the second array
    // const updatedItems = items.map(item => ({ ...item, quantity }));
    // console.log(updatedItems);
    const updatedItems = items.map((item) => {
      const newItem = item.toObject ? item.toObject() : { ...item };
      newItem.quantity = quantity;
      return newItem;
    });

    console.log(updatedItems);

    // // Concatenate the arrays
    // mergedArray.push(...updatedItems);

    // response
    return res.json({
      responseCode: 200,
      message: "Cart data fetched successfully",
      data: updatedItems,
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

    if (cart == null) {
      return res.json({
        responseCode: 500,
        message: "item doesn't exists",
        data: null,
      });
    }

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

//increase quantity
exports.itemIncrease = async (req, res) => {
  try {
    //fetch data
    let { cartId } = req.body;

    //validate
    if (!cartId) {
      return res.json({
        responseCode: 500,
        message: "All fields are required",
        data: null,
      });
    }

    //database item increase
    const cartItem = await Cart.findByIdAndUpdate(
      cartId,
      { $inc: { quantity: 1 } },
      { new: true }
    );
    //response
    return res.json({
      responseCode: 200,
      message: "item increased",
      data: cartItem,
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

//item decrease
exports.itemDecrease = async (req, res) => {
  try {
    //fetch data
    let { cartId } = req.body;

    //validate
    if (!cartId) {
      return res.json({
        responseCode: 500,
        message: "All fields are required",
        data: null,
      });
    }

    //database item decrease
    const cartItem = await Cart.findByIdAndUpdate(
      cartId,
      { $inc: { quantity: -1 } },
      { new: true }
    );
    //response
    return res.json({
      responseCode: 200,
      message: "item increased",
      data: cartItem,
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
