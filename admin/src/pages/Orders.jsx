import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import parcelImage from "../assets/parcel.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders();
  }, []);

  function getAllOrders() {
    axios
      .get("https://wearvibe-backend.vercel.app/order/getownerorders", {
        withCredentials: true,
      })
      .then((res) => {
        setOrders(res.data.reverse());
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data || err));
  }

  function updateOrderStatus(e, id) {
    const newStatus = e.target.value;
    axios
      .put(
        `https://wearvibe-backend.vercel.app/order/updateorderstatus/${id}`,
        { status: newStatus },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data);
        getAllOrders();
      })
      .catch((err) => toast.error(err.response.data));
  }

  return (
    <>
      <Header></Header>
      <div className="container p-20 flex flex-grow max-sm:p-0">
        <Sidebar></Sidebar>
        <div className="w-3/4 h-full bg-white px-8 py-5 shadow ml-4 flex flex-col gap-5 max-sm:w-full max-sm:ml-0 max-sm:px-5 max-sm:gap-5 max-sm:mt-20">
          <div>
            <h3>Order Page</h3>
            <div>
              {orders.length > 0
                ? orders.map((order, index) => {
                    return (
                      <div
                        key={index}
                        className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
                      >
                        <img className="w-12" src={parcelImage} alt="" />
                        <div>
                          <div>
                            {order.items.map((item, index) => {
                              if (index !== order.items.length - 1) {
                                return (
                                  <p key={index} className="py-0.5">
                                    {" "}
                                    {item.name} x {item.quantity}{" "}
                                    <span>{item.size}</span> ,
                                  </p>
                                );
                              } else {
                                return (
                                  <p key={index} className="py-0.5">
                                    {" "}
                                    {item.name} x {item.quantity}{" "}
                                    <span>{item.size}</span>
                                  </p>
                                );
                              }
                            })}
                          </div>
                          <p className="mt-3 mb-2 font-medium">
                            {order.address.firstName} {order.address.lastName}
                          </p>
                          <div>
                            <p>{order.address.street},</p>
                            <p>
                              {order.address.city}, {order.address.state},{" "}
                              {order.address.country}, {order.address.zipcode}
                            </p>
                            <p>{order.address.phone}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm sm:text-[15px]">
                            Items : {order.items.length}
                          </p>
                          <p className="mt-3">Method : {order.paymentMethod}</p>
                          <p>Payment : {order.payment ? "Done" : "Pending"}</p>
                          {/* <p>Date : 8/16/2024</p> */}
                          <p>
                            Date: {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-sm sm:text-[15px]">
                          Rs. {order.amount}.00
                        </p>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(e, order._id)}
                          className="p-2 font-semibold"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Packing">Packing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for delivery">
                            Out for delivery
                          </option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    );
                  })
                : "no orders yet"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
