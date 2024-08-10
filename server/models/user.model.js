import mongoose from "mongoose";

// Define User Schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true
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
    verifiedToken: {
        type: String,
        default: null
    },
    verifiedTokenExpiration: {
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