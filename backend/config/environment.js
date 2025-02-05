import dotenv from "dotenv";
dotenv.config()
const MODE = process.env.NODE_ENV || "development";

console.log(process.env.NODE_ENV)

const config = {
  development: {
    API_BASE_URL: "http://localhost:5000",
    MONGO_URI: "your-local-mongo-uri",
    JWT_SECRET: "your-dev-secret",
  },
  production: {
    API_BASE_URL: "https://your-backend-url.onrender.com",
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  
};

export default config[MODE];
