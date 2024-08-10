import bcrypt from "bcrypt";

// Models
import User from "../models/user.model.js";

// JWT Token
import generateAuthToken from "../utilities/generateAuthToken.js";
import { sendVerificationEmail } from "../mail/auth.mail.js";

// Signup route
export const signupRoute = async (req, res) => {
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
            verifiedToken: verificationToken,
            verifiedTokenExpiration: Date.now() + (24 * 60 * 60 * 1000)
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
        res.json({
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