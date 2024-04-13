require("dotenv").config();
const mailSender = require("./MailSender");
const {bookingConfirmation} = require("../mail_templates/bookingConfirmation");
const Table = require("../models/Table");


exports.table = async (req, res) => {
    try {
        // fetch data
        const {name, email, date, time, noOfGuests, message} = req.body;
        let {tableNumber} = req.body;
        const maxTable = 5;


        // validate data
        if(!name || !email || !date || !time || !noOfGuests) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        
        // convert date to Date object
        const dateObj = new Date(date);

        // format date
        const formattedDate = dateObj.toDateString();
  

        // check for specified table availability
        if(tableNumber !== "") {
            let tableExists = await Table.findOne({ date: date, time: time, tableNumber: tableNumber });

            if(tableExists) {
                return res.status(409).json({
                    success: false,
                    message: "Specified table is reserved in this date and time",
                })
            }

        }
        else {
            // check table availability
            let i;

            for(i=1; i<maxTable+1; i++) {
                tableNumber = i;
                let tableExists = await Table.findOne({ date: date, time: time, tableNumber });
                if(!tableExists)
                    break;
            }
            
            // set current table number
            if(i == maxTable+1) {
                return res.status(403).json({
                    success: false,
                    message: "All tables are reserved",
                })
            }
            
        }

        

        // create db entry
        const tableBooking = await Table.create({
            email: email,
            name: name,
            date: date,
            time: time,
            noOfGuests: noOfGuests,
            message: message,
            tableNumber: tableNumber,
        });

        const bookingId = tableBooking._id.toString().slice(-8);     
        
        let formattedTime;
        if(time == "Breakfast") {
            formattedTime = "7:00 AM to 11:00 AM (" +  time + ")"
        }
        else if(time == "Lunch") {
            formattedTime = "12:00 PM to 3:00 PM (" + time + ")"
        }
        else if(time == "Dinner") {
            formattedTime = "7:00 PM to 10:00 PM (" + time + ")"
        }

        console.log(formattedTime)

        // send email
        await mailSender(email, "Table Reservation Confirmation", bookingConfirmation(name, bookingId, formattedDate, formattedTime, noOfGuests));

        // return response
        return res.status(200).json({
            success: true,
            message: "Booking Successful",
            email,
            bookingId,
            date: formattedDate,
            time: formattedTime,
            noOfGuests: noOfGuests,
            tableNumber
        })

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again",
        });
    }
}
