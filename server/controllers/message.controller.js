import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// Create a new Message
export const createMessage = async (req, res) => {
    try {
        // Get Sender ID
        const senderId = req.user._id;

        // Get Conversation ID from request parameters
        const conversationId = req.params.conversation;

        // Get Message Text from request body
        const { text } = req.body;

        // Check if conversationId are valid
        if (!conversationId) {
            return res.status(400).json({ success: false, message: "Conversation ID id required" });
        }

        // Check if message text is valid
        if (!text) {
            return res.status(400).json({ success: false, message: "Message Text is required" });
        }

        // Check if conversation is exist in database
        const conversation = await Conversation.findById(conversationId);

        // If conversation not found, return error
        if (!conversation) {
            return res.status(404).json({ success: false, message: "Conversation not found" });
        }

        // If senderId is not in the participants list, return error
        if (!conversation.participants.includes(senderId)) {
            return res.status(403).json({ success: false, message: "Unauthorized - You are not a participant in this conversation" });
        }

        // Create a new Message document
        const message = new Message({
            sender: senderId,
            conversation: conversation._id,
            text: text
        });

        // Check if message created successfully
        if (!message) {
            return res.status(400).json({ success: false, message: "Failed to create message" });
        }

        // Save the message to the database
        await message.save();

        // Update Conversation
        conversation.lastmessage.text = text;

        // Save the updated conversation to the database
        await conversation.save();

        // Send the created message in the response with status code 201
        res.status(201).json({ success: true, message });

    } catch (error) {
        console.error("Error creating message:", error.message);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
};

// Get all Messages
export const getMessages = async (req, res) => {
    try {
        // Get Conversation ID from request parameters
        const conversationId = req.params.conversation;

        // Check if conversationId are valid
        if (!conversationId) {
            return res.status(400).json({ success: false, message: "Conversation ID id required" });
        }

        // Check if conversation is exist in database
        const conversation = await Conversation.findById(conversationId);

        // If conversation not found, return error
        if (!conversation) {
            return res.status(404).json({ success: false, message: "Conversation not found" });
        }

        // If senderId is not in the participants list, return error
        if (!conversation.participants.includes(req.user._id)) {
            return res.status(403).json({ success: false, message: "Unauthorized - You are not a participant in this conversation" });
        }

        // Find all Messages in the Conversation
        const messages = await Message.find({ conversation: conversation._id }).sort({ createdAt: -1 });

        // Send the messages in the response with status code 200
        res.status(200).json({ success: true, messages });

    } catch (error) {
        console.error("Error getting messages:", error.message);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
};