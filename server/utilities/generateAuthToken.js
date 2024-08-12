import jwt from "jsonwebtoken";

const generateAuthToken = (userID, res) => {
    try {
        // Create a JWT Token
        const token = jwt.sign({ _id: userID }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // check if the token created successfully
        if (!token) {
            return res.status(400).json({ success: false, message: "Token not generated" });
        }

        // Set the token as a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: (24 * 60 * 60 * 1000) // 24 hour expiration time (3600000 milliseconds)
        });

    } catch (error) {
        console.error("Error generating JWT token:", error.message);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
};

export default generateAuthToken;