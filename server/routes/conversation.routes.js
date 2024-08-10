import express from "express";
import { createConversation, getConversations } from "../controllers/conversation.controller.js";

const router = express.Router();

// Get all Conversations
router.get("/get", getConversations);

// Create a new Conversations
router.post("/create", createConversation);

export default router;