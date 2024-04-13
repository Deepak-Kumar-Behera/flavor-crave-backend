const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.signup = async (req, res) => {
    try {

        // fetch data from body of the request 
        const {
            name,
            email,
            password,
            confirmPassword
        } = req.body;

        // validate the data
        if (!name || !email || !password || !confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        // match 2 passwords
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password value does not match"
            });
        }

        // check if user already exists or not
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create entry in DB
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        // return res
        return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
            user,
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again"
        });
    }
}

exports.login = async (req, res) => {
    try {

        // fetch data from the body
        const { email, password } = req.body;

        // validate data
        if (!email || !password) {
            res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        // check user exists or not
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User is not registered, please signup first"
            });
        }

        // generate JWT, after password matching
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            user.token = token;
            user.password = undefined;

            // create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully"
            });
        }
        else {
            // return res
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure, please try again"
        });
    }
}

exports.logout = async (req, res) => {
    try {
      // Clear the cookie
      res.clearCookie("token");
  
      // Save the user's logout state
    //   await req.user.save();
  
      // Send the success response
      return res.status(200).json({
        success: true,
        message: "Logout Successful"
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Logout Failure, please try again"
      });
    }
  };
  