const Item = require("../models/Item");

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
      message: "All fields are required",
      data: null,
    });
  }
};

// get all items
exports.getAllItems = async (req, res) => {
  try {
    console.log("Getting all items");
    const items = await Item.find({});
    console.log(items);

    return res.json({
      responseCode: 200,
      message: "All items were successfully retrieved",
      data: items,
    });
  } catch (error) {
    return res.json({
      responseCode: 500,
      message: "Something went wrong. Please try again",
      data: null,
    });
  }
};
