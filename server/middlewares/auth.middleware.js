import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
    try {
        // Get jwt token from request
        const token = req.cookies["token"] || "";

        // check if token is provided
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorize" });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {

            // if token is invalid then return error
            if (err) {
                return res.status(403).clearCookie("token").json({ success: false, message: "Unauthorize -Invalid token" });
            }

            // if token is valid then get user information
            const user = await User.findOne({ _id: data._id }, { password: 0 });

            // if user not found then return error
            if (!user) {
                return res.status(404).clearCookie("token").json({ success: false, message: "Unauthorize - User not found" });
            }

            // If the user is found, add the user information to the request object
            req.user = user;

            // Move to the next middleware or route
            next();
        });

    } catch (error) {
        console.error("Error in Auth Middleware:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export default authMiddleware;