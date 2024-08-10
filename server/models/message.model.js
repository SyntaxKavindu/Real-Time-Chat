import mongoose from "mongoose";

// Define Message Schema
const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    seen: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {
    timestamps: true,
});

// Create Message model from schema
const Message = mongoose.model('Message', messageSchema);

export default Message;