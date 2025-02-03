import ResponsiveWrapper from "./ResponsiveWrapper";
import { useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';


const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password must be at least 6 characters long"),
});

const SignupForm = () => {
  const { registerUser:signup, error, clearError,loading,message,user } = useAuth();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) clearError(); // Clear global error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      signupSchema.parse(formData);
      await signup(formData);
      navigate('/')
    } catch (err) {
      console.log(err,"err")
      setLocalError(err.errors[0].message);
    }
  };
  console.log(user)

  return (
    <ResponsiveWrapper>
      <div className="flex justify-center mb-4">
        <img src="/logo.png" alt="Logo" className="w-16 h-16" />
      </div>
      <h2 className="text-2xl font-bold text-center text-primary mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-secondary">Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-secondary">Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required />
        </div>
        {(localError || error) && <p className="text-red-500 text-sm mb-4">{localError || error}</p>}
        <button type="submit" disabled={loading} className="w-full py-3 bg-primary text-white rounded-md hover:bg-purple-700 focus:outline-none">Sign Up</button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
      </p>
    </ResponsiveWrapper>
  );
};

export default SignupForm;
