import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Access AuthContext
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
