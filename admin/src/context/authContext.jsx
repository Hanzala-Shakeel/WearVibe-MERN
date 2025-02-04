import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create AuthContext
const AuthContext = createContext();

// custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provide AuthContext
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    // Check if user is authenticated
    axios
      .get("https://wearvibe-backend.vercel.app/owner/checklogin", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
        }
      })
      .catch((err) => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
        console.log(err.response.data);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
