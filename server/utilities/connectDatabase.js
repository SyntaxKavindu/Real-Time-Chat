import mongoose from "mongoose";
import "dotenv/config";

// Connect to MongoDB
const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected successfully", connection.connection.host, connection.connection.name);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

export default connectDatabase;