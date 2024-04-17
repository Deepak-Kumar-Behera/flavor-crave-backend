const Item = require("../models/Item");

// create item
exports.createItem = async (req, res) => {
  try {
    // fetch data
    let { name, price, dietType, rating, category, image } = req.body;

    // validate data
    if (!name || !price || !dietType || !rating || !category || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (dietType != 1 && dietType != 2) {
      return res.status(400).json({
        success: false,
        message: "Diet Type must be 1 or 2",
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
    return res.status(200).json({
        success: true,
        message: "Item Created Successfully",
        item,
    })


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

// get all items
exports.getAllItems = async (req, res) => {
    try{
        console.log("Getting all items");
        const items = await Item.find({});
        console.log(items);

        return res.status(200).json({
            success: true,
            message: "All items were successfully retrieved",
            body: items
        })
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again",
        })
    }
};
