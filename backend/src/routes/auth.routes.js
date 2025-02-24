import express from "express";
const router = express.Router();

// Controller functions 
import { login, logout, signup, changeProfilePic, checkAuth } from '../controllers/auth.controller.js';
// Protect Auth middleware
import { protectAuth } from "../middleware/auth.middleware.js";

// Register route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Logout route
router.post("/logout", logout);

// Change Profile Pic route
router.post("/changeProfilePic", protectAuth, changeProfilePic);

// Get user
router.get("/checkAuth", protectAuth, checkAuth)

export default router;