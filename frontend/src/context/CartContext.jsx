import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./authContext";
import { toast } from "react-toastify";
import axios from "axios";

// Create a Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Retrieve the cart from localStorage if available, or default to an empty array
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const { isAuthenticated } = useContext(AuthContext);

  // Fetch user's cart from backend when the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("https://wearvibe-backend.vercel.app/cart/getusercart", {
          withCredentials: true,
        })
        .then((res) => {
          setCart(res.data); // Set the cart state to the data retrieved from backend
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [isAuthenticated]); // This effect now runs when isAuthenticated changes

  // Sync the cart to localStorage and backend when cart changes
  useEffect(() => {
    // Store the cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // Sync the cart with the backend
    if (isAuthenticated) {
      axios
        .post(
          "https://wearvibe-backend.vercel.app/cart/synccart",
          { cart },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("Cart synced with backend successfully");
        })
        .catch((err) => {
          console.log("Error syncing cart with backend", err);
        });
    }
  }, [cart, isAuthenticated]); // Sync cart when cart or isAuthenticated changes

  // Function to add items to the cart
  const addToCart = (product, quantity, size) => {
    const existingItem = cart.find(
      (item) => item._id === product._id && item.size === size
    );

    // If the item already exists in the cart show message
    if (existingItem) {
      toast("Item already in your cart");
      return;
    }

    setCart([...cart, { ...product, quantity, size }]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId, size) => {
    setCart(
      cart.filter((item) => item._id !== productId || item.size !== size)
    );
  };

  function updateProductQuantity(quantity, id, size) {
    const existingItem = cart.find(
      (item) => item._id === id && item.size === size
    );
    if (existingItem) {
      // If the item already exists, increase its quantity
      setCart(
        cart.map((item) =>
          item._id === id && item.size === size
            ? { ...item, quantity: Number(quantity) }
            : item
        )
      );
    }
  }

  // Function to calculate the subtotal
  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => {
      const price = item.discountPrice ? item.discountPrice : item.price;
      return acc + price * item.quantity;
    }, 0);
  };

  // Function to calculate the total (including shipping)
  const calculateTotal = () => {
    const shippingFee = 180;
    return calculateSubtotal() + shippingFee;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateProductQuantity,
        calculateSubtotal,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
