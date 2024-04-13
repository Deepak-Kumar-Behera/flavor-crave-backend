const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth
exports.auth = async (req, res, next) => {
    try {
        console.log(req.cookies.token);

        // extract token
        const token = req.cookies.token 
        || req.body.token
        || req.header("Authorisation").replace("Bearer", "");
        
        // if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decode: ", decode);
            req.user = decode;

        } catch (error) {
            // verification - issuse
            return res.status(401).json({
                success: false,
                message: "Token in invalid",
            });
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
}

// isLoggedIn
exports.isLoggedIn = async (req, res, next) => {
    try {

        // extract token
        const token = req.cookies.token 
        || req.body.token
        || req.header("Authorisation").replace("Bearer", "");
        
        // if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decode: ", decode);
            req.user = decode;

        } catch (error) {
            // verification - issuse
            return res.status(401).json({
                success: false,
                message: "Token in invalid",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Logged in",
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
}