import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ShopPage from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import CheckOut from "./pages/CheckOut";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/CartContext";
import Verify from "./pages/Verify";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <CartProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckOut />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify"
            element={
              <ProtectedRoute>
                <Verify />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
