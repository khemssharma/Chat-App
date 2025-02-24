import express from 'express';
import { protectAuth } from '../middleware/auth.middleware.js';
import { getUsersForSidebar, getMessages, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

// Define routes for messages
// router.post('/send', messageController.sendMessage);
router.get('/users', protectAuth, getUsersForSidebar);
router.get('/:id', protectAuth, getMessages);
router.post('/send/:id', protectAuth, sendMessage);

export default router; 