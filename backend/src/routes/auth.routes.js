import express from "express";
const router = express.Router();

// Controller functions 
import { login, logout, signup } from '../controllers/auth.controller.js';

// Register route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Logout route
router.post("/logout", logout);

export default router;