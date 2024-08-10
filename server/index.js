import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

// Middlewares

// Database Configuration
import connectDatabase from "./utilities/connectDatabase.js";

// Routes
import { signupRoute } from "./routes/auth.routes.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const port = process.env.PORT || 5000;

// Auth Routes
app.use("/api/auth", signupRoute);

app.listen(port, () => {
    connectDatabase();
    console.log(`Server is running on port ${port}`);
});