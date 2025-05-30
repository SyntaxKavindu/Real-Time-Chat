import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Models
import User from "../models/user.model.js";

// JWT Token
import generateAuthToken from "../utilities/generateAuthToken.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mail/auth.mail.js";

// Signup route
export const signup = async (req, res) => {
    try {
        // Get fullname and password and email address
        const { fullname, email, password } = req.body;

        // Check user details are valid
        if (!fullname || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check email already exists in database
        const isExist = await User.findOne({ email });

        // If email exists, return error message
        if (isExist) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate new verification token
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        // Check verification token generate success
        if (!verificationToken) {
            return res.status(500).json({ success: false, message: "Failed to generate verification token" });
        }

        // Create a new user
        const user = new User({
            fullname,
            email,
            password: hashedPassword,
            profileImage: `https://avatar.iran.liara.run/username?username=${fullname}`,
            verificationToken: verificationToken,
            verificationTokenExpiration: Date.now() + (24 * 60 * 60 * 1000) // 1 Day
        });

        // check new user create success
        if (!user) {
            return res.status(500).json({ success: false, message: "Failed to create user" });
        }

        // Save the user to the database
        await user.save();

        // Send verification email
        await sendVerificationEmail(email, verificationToken);

        // generate jwt token
        generateAuthToken(user._id, res);

        // send success message
        res.status(201).json({
            success: true,
            message: "User registered successfully. Please check your email for verification.",
            user: {
                ...user._doc, password: undefined
            }
        });

    } catch (error) {
        console.error("Error signing up user:", error.message);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
};

// Login route
export const login = async (req, res) => {
    try {
        // Get email and password from request body
        const { email, password } = req.body;

        // Check email and password are provided
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });

        // If user not found, return error message
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid Credentials" });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);

        // If password does not match, return error message
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        // Update user last login time
        user.lastLogin = Date.now();

        // Save the updated user to the database
        await user.save();

        // Generate jwt token
        generateAuthToken(user._id, res);

        // Send user data
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                ...user._doc, password: undefined
            }
        });

    } catch (error) {
        console.error("Error logging in user:", error.message);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
};

// Verify auth route
export const verifyAuth = async (req, res) => {
    try {
        // Get Token from request
        const token = req.cookies["token"];

        // check if token is provided
        if (!token) {
            return res.status(200).json({ success: false, message: "Unauthorized - No token provided" });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            // if token is invalid then return error
            if (err) {
                return res.status(200).clearCookie("token").json({ success: false, message: "Unauthorized - Invalid token" });
            }

            // if token is valid then get user information
            const user = await User.findOne({ _id: data._id }, { password: 0 });

            // Check user valid
            if (!user) {
                return res.status(200).json({ success: false, message: "Unauthorized - User not found" });
            }

            // Update user last login time
            user.lastLogin = Date.now();

            // Save the updated user to the database
            await user.save();

            // Send user details
            res.status(200).json({
                success: true,
                message: "User authenticated successfully",
                user,
            });
        });

    } catch (error) {
        console.error("Error verifying auth:", error.message);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
};

// LogOut route
export const logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie("token");

        // Send success message
        res.json({ success: true, message: 'Logged out successfully.' });

    } catch (error) {
        console.error("Error logout user:", error.message);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
};

// Verify email route
export const verifyEmail = async (req, res) => {
    try {
        // Get verification token from request body
        const { token } = req.body;

        // get the user Id from request
        const userId = req.user._id;

        // Check verification token is provided
        if (!token) {
            return res.status(400).json({ success: false, message: "Verification token is required" });
        }

        // Find user by verification token
        const user = await User.findOne({ _id: userId, verificationToken: token, verified: false, verificationTokenExpiration: { $gt: Date.now() } }, { password: 0 });

        // If user not found, return error message
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid verification token" });
        }

        // Update user verified status
        user.verified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiration = undefined;

        // Save the updated user to the database
        await user.save();

        // Send Welcome email
        await sendWelcomeEmail(user.email, user.fullname);

        // Send success message
        res.json({
            success: true,
            message: "Email verified successfully",
            user
        });

    } catch (err) {
        console.error("Error verifying user email:", err.message);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
};

// Resend verification token
export const resendVerificationToken = async (req, res) => {
    try {
        res.status(200).json({ success: false, message: "Under Maintenance" });
    } catch (error) {
        console.error("Error resending verification token:", error.message);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
};

// Forgot password route
export const forgotPassword = (req, res) => {
    try {

    } catch (error) {
        console.error("Error forgot password:", error.message);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
};

// Reset password route
export const resetPassword = (req, res) => {
    try {

    } catch (error) {
        console.error("Error reset password:", error.message);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
};
