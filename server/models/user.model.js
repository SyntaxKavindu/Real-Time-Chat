import mongoose from "mongoose";

// Define User Schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    profileImage: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    verified: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    },
    verificationToken: {
        type: String,
        default: null
    },
    verificationTokenExpiration: {
        type: Date,
        default: null
    },
    resetToken: {
        type: String,
        default: null
    },
    resetTokenExpiration: {
        type: Date,
        default: null
    },
}, {
    timestamps: true,
});

// Create User model from schema
const User = mongoose.model('User', userSchema);

export default User;