import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import { parse } from 'cookie';
import jwt from "jsonwebtoken";
import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';

const app = express();

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5000",
        credentials: true,
    },
});

// Middleware 
io.use((socket, next) => {
    try {
        // Get the user's jwt token from the cookie
        const token = parse(socket.handshake.headers.cookie)["token"];

        // check token is empty
        if (token === undefined) {
            socket.disconnect(true);
            return;
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {

            // If the token is invalid, disconnect the user from the socket
            if (err) {
                socket.disconnect(true);
                return;
            }
            // Extract the user ID from the token
            const userId = data._id;

            // Check if the user is existing in database
            const user = await User.findOne({ _id: userId }, { password: 0 });

            // If the user is not found in the database, disconnect the user from the socket
            if (!user) {
                socket.disconnect(true);
                return;
            }

            // Attach the userID to the socket object for later use
            socket.user = user;

            // Move to the next middleware or route
            next();
        });

    } catch (error) {
        console.error("Error in Socket.IO middleware:", error.message);
        return;
    }
});

const connectedUsers = {};

io.on("connection", (socket) => {

    // log the connected user socket ID to the console
    console.log(`User connected : ${socket.id}`);

    if (socket.user != undefined) {
        connectedUsers[socket.user._id] = socket.id;
    }

    // Broadcast the connected users list to all connected users
    io.emit("online-users", Object.keys(connectedUsers));

    socket.on("mark-seen", async (data) => {
        try {
            // Update all messages in the conversation as seen
            await Message.updateMany({ conversation: data.conversation, seen: false }, { $set: { seen: true } });

            // receiver id from the conversation
            const conversation = await Conversation.findById(data.conversation);

            // update the seen flag
            conversation.lastmessage.seen = true;

            // save the updated conversation to the database
            await conversation.save();

            // Find all participants in the conversation
            const participants = conversation.participants;

            // Find receiver id
            const receiverId = participants.find((participant) => (participant._id.toString() !== socket.user._id.toString()));

            // find the receiver socket id
            const receiverSocketId = getReceiverSocketId(receiverId);

            // Send the updated message list to the receiver
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("message-seen", { conversation: data.conversation });
            }

        } catch (error) {
            console.error("Error in marking message as seen:", error.message);
        }
    });

    // Handle user disconnecting
    socket.on("disconnect", () => {

        // Delete the disconnect user's socket ID from the connectedUsers object
        delete connectedUsers[socket.user._id];

        // Broadcast the connected users list to all connected users
        io.emit("online-users", Object.keys(connectedUsers));

        // log the disconnected user socket ID to the console
        console.log(`User disconnected : ${socket.id}`);
    });
});

export const getReceiverSocketId = (receiverId) => {
    return connectedUsers[receiverId];
};

export { app, server, io };