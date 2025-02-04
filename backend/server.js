// backend/server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';  // Importing the DB config
import apiRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser';



dotenv.config();
const app = express();
// Add this middleware before any route definitions
app.use(cookieParser());

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

app.use(express.urlencoded({ extended: true }));

// Routes
// Add routes for authentication and notes
app.use("/api",apiRoutes)
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
