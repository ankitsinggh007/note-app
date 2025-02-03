import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { token } = useAuth(); // Check if user is authenticated
  return token ? <Outlet /> : <Navigate to="/login" />; // Redirect if not logged in
};

export default PrivateRoute;
