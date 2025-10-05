require("dotenv").config();
const mailSender = require("./MailSender");
const {
  bookingConfirmation,
} = require("../mail_templates/bookingConfirmation");
const Table = require("../models/Table");

exports.table = async (req, res) => {
  try {
    // fetch data
    const { date, time, noOfGuests, message } = req.body;
    let { tableNumber } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const { name, email, id } = req.user;
    const maxTable = 5;

    // validate data
    if (!date || !time || !noOfGuests) {
      return res.json({
        responseCode: 500,
        message: "All fields are required",
        data: null,
      });
    }

    // convert date to Date object
    const dateObj = new Date(date);

    // format date
    const formattedDate = dateObj.toDateString();

    // check for specified table availability
    if (tableNumber) {
      let tableExists = await Table.findOne({
        date: date,
        time: time,
        tableNumber: tableNumber,
      });

      if (tableExists) {
        return res.json({
          responseCode: 500,
          message: "Specified table is reserved in this date and time",
          data: null,
        });
      }
    } else {
      // check table availability
      let i;

      for (i = 1; i < maxTable + 1; i++) {
        tableNumber = i;
        let tableExists = await Table.findOne({
          date: date,
          time: time,
          tableNumber,
        });
        if (!tableExists) break;
      }

      // set current table number
      if (i == maxTable + 1) {
        return res.json({
          responseCode: 500,
          message: "All tables are reserved",
          data: null,
        });
      }
    }

    // create db entry
    const tableBooking = await Table.create({
      email: email,
      userId: id,
      name: name,
      date: date,
      time: time,
      noOfGuests: noOfGuests,
      message: message,
      tableNumber: tableNumber,
    });

    const bookingId = tableBooking._id.toString().slice(-8);

    let formattedTime;
    if (time == "Breakfast") {
      formattedTime = "7:00 AM to 11:00 AM (" + time + ")";
    } else if (time == "Lunch") {
      formattedTime = "12:00 PM to 3:00 PM (" + time + ")";
    } else if (time == "Dinner") {
      formattedTime = "7:00 PM to 10:00 PM (" + time + ")";
    }

    console.log(formattedTime);

    // send email
    await mailSender(
      email,
      "Table Reservation Confirmation",
      bookingConfirmation(
        name,
        bookingId,
        formattedDate,
        formattedTime,
        noOfGuests
      )
    );

    // return response
    return res.json({
      responseCode: 200,
      message: "Booking Successful",
      data: {
        email: email,
        bookingId: bookingId,
        tableNumber: tableNumber,
        date: formattedDate,
        time: formattedTime,
        noOfGuests: noOfGuests,
      },
    });
  } catch (error) {
    console.error(error);
    return res.json({
      responseCode: 500,
      message: `Something went wrong. ${error}`,
      data: null,
    });
  }
};

//show table bookings

exports.showTableBookings = async (req, res) => {
  try {
    //fetch data
    let { userId } = req.body;

    //validate
    if (!userId) {
      return res.json({
        responseCode: 500,
        message: "All fields are required",
        data: null,
      });
    }

    //database fetching previus bookings
    const bookings = await Table.find({ userId: userId });

    bookings.reverse();
    //response
    return res.json({
      responseCode: 200,
      message: "sending bookings",
      data: bookings,
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

//table cancel
exports.tableCancel = async (req, res) => {
  try {
    // fetch data
    let { bookingId } = req.body;

    // validate data
    if (!bookingId) {
      return res.json({
        responseCode: 500,
        message: "All fields are required",
        data: null,
      });
    }

    // removing order from ordertable
    const table = await Table.findByIdAndDelete(bookingId);

    if (!table) {
      return res.json({
        responseCode: 500,
        message: "booking doesn't exist",
        data: null,
      });
    }

    // response
    return res.json({
      responseCode: 200,
      message: "booking cancelled",
      data: table,
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
