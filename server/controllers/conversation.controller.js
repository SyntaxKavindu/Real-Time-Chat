import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";


// Create Conversation
export const createConversation = async (req, res) => {
    try {
        // Get user id from request
        const userId = req.user._id;

        // New Participant email address
        const { email } = req.body;

        // Check if the email provided is valid
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // Check if the provide email is same as the current user
        if (email === req.user.email) {
            return res.status(400).json({ success: false, message: "Cannot create a conversation with yourself" });
        }

        // Check if the user with the provided email exists
        const user = await User.findOne({ email });

        // If the user with the provided email does not exist, return error message
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the current user already has a conversation with the provided email
        const isExisting = await Conversation.findOne({ participants: { $all: [userId, user._id] } });

        // If the current user already has a conversation with the provided email, return success message
        if (isExisting) {
            return res.status(200).json({ success: false, message: "Conversation already exists" });
        }

        // Create a new conversation with the provided participants
        const conversation = new Conversation({
            participants: [userId, user._id]
        });

        // Check if new conversation is created successfully
        if (!conversation) {
            return res.status(500).json({ success: false, message: "Failed to create conversation" });
        }

        // Save the conversation to the database
        await conversation.save();

        // Send the created conversation to the client
        res.status(201).json({ success: true, conversation });

    } catch (error) {
        console.error("Error creating conversation:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get Conversations
export const getConversations = async (req, res) => {
    try {
        // Get user id from request
        const userId = req.user._id;

        // Get conversations from the database
        const conversations = await Conversation.find({ participants: { $in: [userId] } }).populate("participants", ["_id", "fullname", "email", "profileImage", "lastLogin", "role"]);

        // Filter conversations and remove current user from conversations
        const filteredConversations = conversations.map((conversation) => {
            const [filteredParticipants] = conversation.participants.filter((participant) => (participant._id !== userId));
            return {
                ...conversation._doc, participants: filteredParticipants
            };
        });

        // Send the filtered conversations to the client
        res.status(200).json({ success: true, conversations: filteredConversations });

    } catch (error) {
        console.error("Error getting conversations:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
