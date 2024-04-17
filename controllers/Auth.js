const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    // fetch data from body of the request
    const { name, email, password, confirmPassword } = req.body;

    // validate the data
    if (!name || !email || !password || !confirmPassword) {
      return res.status(403).json({
        status: "error",
        responseCode: 500,
        message: "All fields are required",
        data: null,
      });
    }

    // match 2 passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "error",
        responseCode: 500,
        message: "Password does not match",
        data: null,
      });
    }

    // check if user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        responseCode: 500,
        message: "User already registered",
        data: null,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create entry in DB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // return res
    return res.status(200).json({
      status: "success",
      responseCode: 200,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Internal Server Error",
      message: "User cannot be registered. Please try again",
      responseCode: 501,
      data: null,
    });
  }
};

exports.login = async (req, res) => {
  try {
    // fetch data from the body
    const { email, password } = req.body;

    // validate data
    if (!email || !password) {
      res.status(403).json({
        status: "error",
        responseCode: 500,
        message: "All fields are required",
        data: null,
      });
    }

    // check user exists or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "error",
        responseCode: 500,
        message: "User is not registered, please signup first",
        data: null,
      });
    }

    // generate JWT, after password matching
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;

      // create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      return res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      // return res
      return res.status(401).json({
        status: "error",
        responseCode: 500,
        message: "Password is incorrect",
        data: null,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      responseCode: 501,
      message: "Login Failure, please try again",
      data: null,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie("token");

    // Save the user's logout state
    //   await req.user.save();

    // Send the success response
    return res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Logout Failure, please try again",
    });
  }
};
