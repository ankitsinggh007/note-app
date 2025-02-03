// context/AuthContext.js
import { createContext, useContext, useState } from 'react';
import { login,register } from '../services/authService';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

// Save user & token in localStorage
const saveAuthData = (user, message) => {
  setUser(user);
  setMessage(message)
};

  // Login and Registration functions
  const loginUser = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { messages, user } = await login(email, password);
      saveAuthData(user, message);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (data) => {
    setLoading(true);
    try {
      const { user,message } = await register(data);
      saveAuthData(user,message);// Save user data after successful registration
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <AuthContext.Provider value={{ user, loading, error,message, loginUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};
