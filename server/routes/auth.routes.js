import express from "express";

const router = express.Router();

// Signup route
export const signupRoute = (req, res) => {
    try {
        // Get fullname and password and email address
        // Check user details are valid
        // Check email already exists in database

    } catch (error) {
        console.error("Error signing up user:", error.message);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
};