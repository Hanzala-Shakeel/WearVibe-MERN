import Header from "../components/Header";
import CartTotals from "../components/CartTotals";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import stripeLogo from "../assets/stripe.png";

const CheckOut = () => {
  const { cart, setCart, calculateTotal } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    country: "",
  });

  function handleChange(e) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const orderData = {
      address: formData,
      items: cart,
      amount: calculateTotal(),
    };

    if (orderData && paymentMethod === "cod") {
      axios
        .post("https://wearvibe-backend.vercel.app/order/placeorder", orderData, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data);
          setCart([]);
          localStorage.removeItem("cart");
        })
        .catch((err) => toast.error(err.response.data));
    }
    if (orderData && paymentMethod === "stripe") {
        axios
          .post("https://wearvibe-backend.vercel.app/order/placeorderstripe", orderData, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.status === 200) {
              const { session_url } = res.data;
              window.location.replace(session_url);
              // window.location = session_url;
            }
            else{
              toast.error(err.response.data)
            }
          })
          .catch((err) => toast.error(err.response.data));
    }
  }

  return (
    <>
      <Header title={"CheckOut."}></Header>
      <form
        onSubmit={handleSubmit}
        className="px-20 flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] max-sm:px-5 max-sm:mt-20"
      >
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px] max-sm:text-sm">
          <div className="text-xl sm:text-2xl my-3 max-sm:text-lg">
            <div className="inline-flex gap-2 items-center mb-3">
              <p className="text-gray-500">
                DELIVERY{" "}
                <span className="text-gray-700 font-medium">INFORMATION</span>
              </p>
              <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
            </div>
          </div>
          <div className="flex gap-3">
            <input
              required
              name="firstName"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
              type="text"
              placeholder="First name"
              onChange={handleChange}
            />
            <input
              required
              name="lastName"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
              type="text"
              placeholder="Last name"
              onChange={handleChange}
            />
          </div>
          <input
            required
            name="email"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
            type="email"
            placeholder="Email address"
            onChange={handleChange}
          />
          <input
            required
            name="street"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
            type="text"
            placeholder="Street"
            onChange={handleChange}
          />
          <div className="flex gap-3">
            <input
              required
              name="city"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
              type="text"
              placeholder="City"
              onChange={handleChange}
            />
            <input
              name="state"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
              type="text"
              placeholder="State"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-3">
            <input
              required
              name="zipcode"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
              type="number"
              placeholder="Zipcode"
              onChange={handleChange}
            />
            <input
              required
              name="country"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
              type="text"
              placeholder="Country"
              onChange={handleChange}
            />
          </div>
          <input
            required
            name="phone"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
            type="number"
            placeholder="Phone"
            onChange={handleChange}
          />
        </div>
        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <div className="w-full">
              <div className="text-2xl max-sm:text-lg">
                <div className="inline-flex gap-2 items-center mb-3">
                  <p className="text-gray-500">
                    CART{" "}
                    <span className="text-gray-700 font-medium">TOTALS</span>
                  </p>
                  <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                </div>
              </div>
              <CartTotals></CartTotals>
            </div>
          </div>
          <div className="mt-12">
            <div className="inline-flex gap-2 items-center mb-3">
              <p className="text-gray-500">
                PAYMENT{" "}
                <span className="text-gray-700 font-medium">METHOD</span>
              </p>
              <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
            </div>
            <div className="flex gap-3 flex-col lg:flex-row">
              {/* Stripe Payment Option */}
              <div
                onClick={() => toast.error("This feature is disabled")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    paymentMethod === "stripe" ? "bg-green-400" : ""
                  }`}
                ></p>
                <img className="h-5 mx-4" src={stripeLogo} alt="Stripe" />
              </div>

              {/* Cash on Delivery Payment Option */}
              <div
                onClick={() => setPaymentMethod("cod")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    paymentMethod === "cod" ? "bg-green-400" : ""
                  }`}
                ></p>
                <p className="text-gray-500 text-sm font-medium mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>
            <div className="w-full text-end mt-8 max-sm:mb-5">
              <button
                type="submit"
                className="bg-black text-white px-16 py-3 text-sm rounded-md max-sm:text-xs"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckOut;
