import express from "express";
import { login, logout, signup, verifyAuth, verifyEmail } from "../controllers/auth.controller.js";

// Middleware
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/signin", login);

// Logout route
router.post("/signout", logout);

// Verify Auth route
router.get("/verify-auth", verifyAuth);

// Verify Email route
router.post("/verify-email", authMiddleware, verifyEmail);

export default router;