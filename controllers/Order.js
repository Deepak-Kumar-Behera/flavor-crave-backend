const Item = require("./../models/Item");
const Cart = require("./../models/Cart");
const Order = require("./../models/Order");

//place order
exports.placeOrder = async (req, res) => {
  try {
    // fetch data
    let { userId } = req.body;

    console.log(userId);

    // validate data
    if (!userId) {
      return res.json({
        responseCode: 500,
        message: "Please provide userId",
        data: null,
      });
    }

    // Find items in cart
    const cartItems = await Cart.find({ userId: userId });

    console.log(cartItems);
    if (cartItems.length == 0) {
      return res.json({
        responseCode: 500,
        message: "Cart is empty",
        data: null,
      });
    }

    function getDeliveryTime(num) {
      const currentTime = new Date();
      const thirtyMinutesLater = new Date(currentTime.getTime() + 30 * 60000); // 30 minutes in milliseconds

      // Array of short month names
      const shortMonthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Function to add leading zeros to single-digit numbers
      const addLeadingZero = (number) => {
        return number < 10 ? "0" + number : number;
      };

      // Get day, short month name, and year from the date object
      const day = addLeadingZero(thirtyMinutesLater.getDate());
      const monthIndex = thirtyMinutesLater.getMonth();
      const shortMonth = shortMonthNames[monthIndex];
      const year = thirtyMinutesLater.getFullYear();

      // Combine day, short month name, and year
      const formattedDate = `${day} ${shortMonth} ${year}`;

      // Format time
      const formattedTime = thirtyMinutesLater.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      console.log("Formatted Time:", formattedTime);
      console.log("Formatted Date:", formattedDate);

      if (num == 0) {
        return formattedTime;
      }
      if (num == 1) {
        return formattedDate;
      }
    }

    Promise.all(
      cartItems.map(async (cartItem) => {
        try {
          // Create order
          const newOrder = await Order.create({
            userId: cartItem.userId,
            itemId: cartItem.itemId,
            quantity: cartItem.quantity,
            time: getDeliveryTime(0), // Current time + 30 minutes
            date: getDeliveryTime(1),
            orderType: 1, // 1 means Delivery
            status: 1, // 1 means preparing, 2 means on the way, 3 means delivered
          });
          console.log("Order created:", newOrder);
        } catch (error) {
          console.error("Error creating order:", error);
        }
      })
    ).then(async () => {
      try {
        // Delete carts after creating orders
        await Cart.deleteMany({ userId: cartItems[0].userId }); // Assuming userId is same for all cart items
        console.log("Carts deleted successfully");
      } catch (error) {
        console.error("Error deleting carts:", error);
      }
    });

    const order = await Order.find({ userId: userId });

    console.log(order);

    // response
    return res.json({
      responseCode: 200,
      message: "Order placed successfully",
      data: order,
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

// show order
exports.showOrder = async (req, res) => {
  try {
    // fetch data
    let { userId } = req.body;

    console.log(userId);

    // validate data
    if (!userId) {
      return res.json({
        responseCode: 500,
        message: "Please provide userId",
        data: null,
      });
    }

    // Find orders by userId
    const orders = await Order.find({ userId: userId });

    const itemIds = orders.map((order) => order.itemId);

    const items = await Item.find({ _id: { $in: itemIds } });

    const mergedData = orders.map((order) => {
      const item = items.find((item) => item._id == order.itemId);
      // console.log(item);
      return { ...order.toObject(), item };
    });

    console.log(mergedData);

    // response
    return res.json({
      responseCode: 200,
      message: "Order fetched successfully",
      data: mergedData,
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

// change order status
exports.changeOrderStatus = async (req, res) => {
  try {
    // fetch data
    let { orderId } = req.body;

    console.log(userId);

    // validate data
    if (!orderId) {
      return res.json({
        responseCode: 500,
        message: "Please provide orderId",
        data: null,
      });
    }

    // Find order and change status
    //   const order = await Order.findByIdAndUpdate()

    // response
    return res.json({
      responseCode: 200,
      message: "Order fetched successfully",
      data: "order",
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

//cancel order
exports.orderCancel = async (req, res) => {
  try {
    // fetch data
    let { orderId } = req.body;

    // validate data
    if (!orderId) {
      return res.json({
        responseCode: 500,
        message: "All fields are required",
        data: null,
      });
    }

    // removing order from ordertable
    const order = await Order.findByIdAndDelete(orderId);

    if (order == []) {
      return res.json({
        responseCode: 500,
        message: "item doesn't exists",
        data: null,
      });
    }

    // response
    return res.json({
      responseCode: 200,
      message: "order cancelled",
      data: order,
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
