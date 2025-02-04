// backend/routes/auth.js
import express from 'express';
import { registerUser, loginUser,logoutUser } from '../controllers/authController.js';
import authMiddleware from '../middleware/authentication.js';

const router = express.Router();

// Register user route
router.post('/register', registerUser);

// Login user route
router.post('/login', loginUser);
// Logout user route
router.post('/logout', authMiddleware, logoutUser);

export default router;
