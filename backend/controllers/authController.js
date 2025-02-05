import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  const { email, password, username } = req.body;
  console.log(email, password, username);
  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // You can add password validation here if needed
    // Example: Check if password meets a minimum length or complexity

    console.log(userExists,"userexist")
    // Create a new user
    const user = new User({ email, password, username });
      
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token in the cookie
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "none" });


    


    res.status(201).json({ message: 'User created successfully',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,  // Add other relevant user fields
        name: user.name,  // Add name if you have it
      }
      

     });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password with the hashed password
    const isMatch = await user.comparePassword(password);  // Corrected method name
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });


    // Set the token in the cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure only in production
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    res.status(200).json({

      user: {
        id: user._id,
        email: user.email,
        username: user.username,  // Add other relevant user fields
        name: user.name,  // Add name if you have it
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    /*
     const option = {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    return res.status(200).cookie("token", null, option).json({
      success: true,
      message: "User successfully logged out",
    });
  } 
    */
    // Clear the token from the cookies
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Match with res.cookie
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });
    // Send a response indicating the user has been logged out
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

