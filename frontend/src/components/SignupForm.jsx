import  ResponsiveWrapper from './ResponsiveWrapper'
import { useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";


const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      signupSchema.parse(formData);
      console.log("Proceed to backend call");
    } catch (err) {
      setError(err.errors[0].message);
    }
  };

  return (
    <ResponsiveWrapper>
        
        {/* Logo Section */}
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Logo" className="w-16 h-16" />
        </div>

        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-md hover:bg-purple-700 focus:outline-none"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account? */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <p className="mx-4 text-gray-500 text-sm">or</p>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Sign-up Button */}
        <button className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none">
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
          Sign up with Google
        </button>
        </ResponsiveWrapper>
  );
};

export default SignupForm;
