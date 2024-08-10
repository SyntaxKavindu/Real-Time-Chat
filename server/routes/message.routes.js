import express from "express";
import { createMessage, getMessages } from "../controllers/message.controller.js";

const router = express.Router();

// Create a new Message
router.post("/create/:conversation", createMessage);

// Get all Messages in a Conversation
router.get("/get/:conversation", getMessages);

export default router;