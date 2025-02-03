// components/LoginForm.jsx
import ResponsiveWrapper from "./ResponsiveWrapper";
import { useState } from 'react';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(3, 'Password must be at least 3 characters long'),
  });
const LoginForm = () => {
  const { loginUser, loading, error, user} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    console.log("hello world  ")
    e.preventDefault();
    try {
      await loginUser(email, password);
      console.log("User logged in successfully");
    } catch (err) {
      console.error(err.message);
    }
  };
  console.log(user,"user");

  return (
    <ResponsiveWrapper>
        {/* Logo Section */}
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Logo" className="w-16 h-16" />
        </div>
        <h2 className="text-2xl font-bold text-center text-primary mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-secondary">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-secondary">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          {error && <p>{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-md hover:bg-purple-700 focus:outline-none"
          >
            Login
          </button>
          
        </form>
        {/* Sign Up Link */}
        <p className="text-center text-sm text-secondary mt-4">
          Not having an account? 
          <Link to="/signup" className="text-primary font-semibold hover:underline">
            Create one
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Google Login */}
        <button className="w-full py-3 border border-gray-300 text-secondary rounded-md flex items-center justify-center gap-2 hover:bg-gray-100">
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
      
        </ResponsiveWrapper>
  );
};

export default LoginForm;
