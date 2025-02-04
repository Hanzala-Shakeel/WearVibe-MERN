import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/authContext"; // Import useAuth
import Login from "./pages/Login"
import CreateProducts from "./pages/CreateProducts";
import ProductsList from "./pages/ProductsList";
import Orders from "./pages/Orders";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {

  const { isAuthenticated } = useAuth(); // Access AuthContext

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/allproducts" /> : <Login />} />
          <Route
            path="/createproducts"
            element={
              <ProtectedRoute>
                <CreateProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allproducts"
            element={
              <ProtectedRoute>
                <ProductsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
