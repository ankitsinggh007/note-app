import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import apiRoutes from "./routes/auth.js";
import config from "./config/environment.js";

dotenv.config();
const app = express();
app.use(cookieParser());

// ✅ Dynamic CORS Setup  
app.use(
  cors({
    origin: process.env.NODE_ENV === "production"
      ? "https://your-frontend.vercel.app"
      : "http://localhost:5173", // Vite default port
    credentials: true, // Allows cookies
  })
);

// ✅ Ensure JSON & URL encoding  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to MongoDB  
connectDB();

// ✅ API Routes  
app.use("/api", apiRoutes);

// ✅ Start Server  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
