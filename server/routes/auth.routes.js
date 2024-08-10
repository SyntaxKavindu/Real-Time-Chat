import express from "express";
import { signupRoute } from "../controllers/auth.controller.js";

const router = express.Router();

// Signup route
router.post("/signup", signupRoute);

export default router;