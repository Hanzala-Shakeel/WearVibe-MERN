import Header from "../components/Header";
import Footer from "../components/Footer";
import deleteIcon from "../assets/delete.png";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/authContext";
import CartTotals from "../components/CartTotals";
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, updateProductQuantity, removeFromCart } =
    useContext(CartContext);

  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  function navigateToCheckOut() {
    if (!isAuthenticated) {
      toast("please login to proceed");
      return;
    }
    navigate("/checkout");
  }

  return (
    <>
      <Header title="Cart."></Header>
      <div className="cart pt-14 px-20 max-sm:p-5 max-sm:mt-20">
        <div className="text-2xl mb-3">
          <div className="flex gap-2 items-center mb-3">
            <p className="text-zinc-500 max-sm:text-lg">
              {"YOUR "}
              <span className="text-zinc-700 font-medium">CART</span>
            </p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-zinc-700"></p>
          </div>
        </div>
        <div>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item, index) => {
              return (
                <div
                  key={index}
                  className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6">
                    <img className="w-16 sm:w-20" src={item.image} alt="" />
                    <div>
                      <p className="text-sm sm:text-lg font-medium max-sm:text-xs">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>
                          Rs.{" "}
                          {item.discountPrice ? item.discountPrice : item.price}
                        </p>
                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                          {item.size}
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateProductQuantity(e.target.value, item._id, item.size)
                    }
                  ></input>
                  <button onClick={() => removeFromCart(item._id, item.size)}>
                    <img
                      className="w-4 mr-4 sm:w-5 cursor-pointer"
                      src={deleteIcon}
                      alt=""
                    ></img>
                  </button>
                </div>
              );
            })
          )}
        </div>
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <div className="w-full">
              <div className="text-2xl">
                <div className="inline-flex gap-2 items-center mb-3 max-sm:text-lg">
                  <p className="text-zinc-500">
                    {"CART "}
                    <span className="text-gray-700 font-medium">TOTALS</span>
                  </p>
                  <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                </div>
              </div>
            </div>
            <CartTotals></CartTotals>
            <div className=" w-full text-end">
              <button
                onClick={navigateToCheckOut}
                className="bg-black rounded-md text-white text-sm my-8 px-8 py-3 max-sm:text-xs max-sm:px-5"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Cart;
