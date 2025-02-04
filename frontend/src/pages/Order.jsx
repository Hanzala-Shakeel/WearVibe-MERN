import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUserOrders();
  }, []);

  function getUserOrders() {
    axios
      .get("https://wearvibe-backend.vercel.app/order/getuserorders", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setOrders(res.data.reverse());
      })
      .catch((err) => console.log(err.response.data || err));
  }

  return (
    <>
      <Header title={"Orders."}></Header>
      <div className="order pt-14 px-20 max-sm:p-5 max-sm:mt-20">
        <div className="text-2xl mb-3">
          <div className="flex gap-2 items-center mb-3">
            <p className="text-zinc-500 max-sm:text-lg">
              {"MY "}
              <span className="text-zinc-700 font-medium">ORDERS</span>
            </p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-zinc-700"></p>
          </div>
        </div>
        {orders.length > 0
          ? orders.map((orderData, index) => {
              return (
                <div
                  key={index}
                  className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  {/* Order Information */}
                  <div className="flex items-start gap-6 text-sm max-sm:text-xs">
                    <div>
                      {orderData.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-start gap-6 text-sm max-sm:text-xs mt-5"
                        >
                          <img
                            className="w-16 sm:w-20"
                            src={item.image}
                            alt={item.name}
                          />
                          <div>
                            <p className="sm:text-base font-medium max-sm:text-sm">
                              {item.name}
                            </p>
                            <div className="flex items-center gap-3 mt-1 text-base text-gray-700 max-sm:text-xs">
                              <p>
                                Rs.{" "}
                                {item.discountPrice > 0
                                  ? item.discountPrice
                                  : item.price}
                                .00
                              </p>
                              <p>Quantity: {item.quantity}</p>
                              <p>Size: {item.size}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <p className="mt-5">
                        Date:{" "}
                        <span className=" text-gray-400">
                          {new Date(orderData.date).toDateString()}
                        </span>
                      </p>
                      <p className="mt-1">
                        Payment:{" "}
                        <span className=" text-gray-400">
                          {orderData.paymentMethod}
                        </span>
                      </p>
                      <p className="mt-1">
                        Total:{" "}
                        <span className=" text-gray-400">
                          Rs. {orderData.amount}.00
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Order Status and Actions */}
                  <div className="md:w-1/2 flex justify-between">
                    <div className="flex items-center gap-2">
                      <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                      <p className="text-sm md:text-base max-sm:text-xs">
                        {orderData.status}
                      </p>
                    </div>
                    <button
                      onClick={() => getUserOrders()}
                      className="border px-4 py-2 text-sm font-medium rounded-sm max-sm:text-xs"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              );
            })
          : "no orders"}
      </div>
      <Footer></Footer>
    </>
  );
};

export default Order;
