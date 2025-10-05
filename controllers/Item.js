const Item = require("../models/Item");
const Cart = require("../models/Cart");

// create item
exports.createItem = async (req, res) => {
  try {
    // fetch data
    let { name, price, dietType, rating, category, image } = req.body;

    // validate data
    if (!name || !price || !dietType || !rating || !category || !image) {
      res.json({
        responseCode: 500,
        message: "All fields are required",
        data: null,
      });
    }

    if (dietType != 1 && dietType != 2) {
      res.json({
        responseCode: 500,
        message: "Diet Type must be 1 or 2",
        data: null,
      });
    }

    // Create a new item in DB
    const item = await Item.create({
      name,
      price,
      dietType,
      rating,
      category,
      image,
    });

    // return res
    res.json({
      responseCode: 200,
      message: "Item Created Successfully",
      data: item,
    });
  } catch (error) {
    console.error(error);
    res.json({
      responseCode: 500,
      message: "Something went wrong",
      data: null,
    });
  }
};

// get all items

// exports.getAllItems = async (req, res) => {
//   try {
//     const items = await Item.find({});
//     console.log("getAllItems", items);



//     return res.json({
//       responseCode: 200,
//       message: "All items were successfully retrieved",
//       data: items,
//     });
//   } catch (error) {
//     return res.json({
//       responseCode: 500,
//       message: "Something went wrong. Please try again",
//       data: null,
//     });
//   }
// };

// exports.getAllItems = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     // Retrieve all items from the database
//     const items = await Item.find({});

//     // Assuming you have a Cart model and userId is the reference to the user's cart
//     const userCart = await Cart.find({ userId });

//     // If the user has a cart, extract the itemIds from the cart
//     const cartItemIds = userCart ? userCart.items.map(item => item.itemId.toString()) : [];

//     console.log(cartItemIds);

//     // Iterate through each item and add isAddedToCart key based on cartItemIds
//     const itemsWithCartStatus = items.map(item => {
//       return {
//         ...item.toObject(),
//         isAddedToCart: cartItemIds.includes(item._id.toString())
//       };
//     });

//     return res.json({
//       responseCode: 200,
//       message: "All items were successfully retrieved",
//       data: itemsWithCartStatus,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       responseCode: 500,
//       message: "Something went wrong. Please try again",
//       data: null,
//     });
//   }
// };

// exports.getAllItems = async (req, res) => {
//   try {
//     const { userId } = req.body;


//     // Retrieve all items from the database
//     const items = await Item.find({});

//     // Assuming you have a Cart model and userId is the reference to the user's cart
//     const userCart = await Cart.find({ userId });

//     console.log(userCart);

//     const itemIds = userCart.map((item) => item.itemId);

//     // // Iterate through each item and add isAddedToCart key based on cartItemIds
//     const itemsWithCartStatus = items.map(item => {
//       return {
//         ...item.toObject(),
//         isAddedToCart: itemIds.includes(item._id.toString())
//       };
//     });

//     console.log(itemsWithCartStatus);

//     return res.json({
//       responseCode: 200,
//       message: "All items were successfully retrieved",
//       data: itemsWithCartStatus,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       responseCode: 500,
//       message: "Something went wrong. Please try again",
//       data: null,
//     });
//   }
// };
