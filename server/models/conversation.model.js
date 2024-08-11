import mongoose from "mongoose";

// Define Conversation Schema
const conversationSchema = new mongoose.Schema({
    participants: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        required: true,
    },
    lastmessage: {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default:null
        },
        text: {
            type: String,
            default: "No Last Message",
        }
    }
}, {
    timestamps: true
});

// Create Conversation model from schema
const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;