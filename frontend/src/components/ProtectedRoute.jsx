import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // Access AuthContext
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
