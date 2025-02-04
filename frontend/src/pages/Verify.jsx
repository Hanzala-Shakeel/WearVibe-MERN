import { useSearchParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/authContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { setCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  function verifyPayment() {
    if (!isAuthenticated) {
      return null;
    }
    axios
      .post(
        "https://wearvibe-backend.vercel.app/order/verifystripe",
        { success, orderId },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          setCart([]);
          localStorage.removeItem("cart");
          navigate("/order");
          toast.success(res.data);
        } else {
          navigate("/cart");
          toast.error(res.data);
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

  useEffect(() => {
    verifyPayment();
  }, [isAuthenticated]);

  return <div>verify</div>;
};

export default Verify;
