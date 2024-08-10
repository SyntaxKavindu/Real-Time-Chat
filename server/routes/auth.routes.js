import express from "express";
import { login, logout, signup, verifyEmail } from "../controllers/auth.controller.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/signin", login);

// Logout route
router.post("/signout", logout);

// Verify route
router.post("/verify-email", verifyEmail);

export default router;