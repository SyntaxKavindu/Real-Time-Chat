import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import path from "path";

// Initialize Server with WebSocket
import { app, server } from "./utilities/webSocket.js";

// Middlewares
import authMiddleware from "./middlewares/auth.middleware.js";

// Database Configuration
import connectDatabase from "./utilities/connectDatabase.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import messageRoutes from "./routes/message.routes.js";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5000", credentials: true }));

// Server Port
const port = process.env.PORT || 5000;

// __dirname
const __dirname = path.resolve();

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "client/dist")));

// Auth Routes
app.use("/api/auth", authRoutes);

// Conversation Routes
app.use("/api/conversation", authMiddleware, conversationRoutes);

// Message Routes
app.use("/api/message", authMiddleware, messageRoutes);

// Send all requests to the React app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

server.listen(port, () => {
    connectDatabase();
    console.log(`Server is running on port ${port}`);
});