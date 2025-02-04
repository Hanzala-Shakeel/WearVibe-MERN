import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductsList = () => {
  const [products, setProducts] = useState();

  function getAllProducts() {
    axios
      .get("https://wearvibe-backend.vercel.app/product/getallproducts", {
        withCredentials: true,
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        setProducts([]);
      });
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  function deleteProduct(id) {
    // Disable the feature and show a toast notification
    toast.error("This feature is disabled");
    // axios
    //   .delete(`http://localhost:3000/product/delete/${id}`, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     toast.success(res.data);
    //     getAllProducts();
    //   })
    //   .catch((err) => toast.error(err.response.data));
  }

  function updateAvailability(e, id) {
    const newAvailability = e.target.value;
    axios
      .put(
        `https://wearvibe-backend.vercel.app/product/update/${id}`,
        { availability: newAvailability },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data);
        getAllProducts();
      })
      .catch((err) => toast.error(err.response.data));
  }

  return (
    <>
      <Header></Header>
      <div className="container p-20 flex flex-grow max-sm:p-0">
        <Sidebar></Sidebar>
        <div className="w-3/4 h-full bg-white px-8 py-5 shadow ml-4 flex flex-col gap-5 max-sm:w-full max-sm:ml-0 max-sm:px-5 max-sm:gap-5 max-sm:mt-20">
          <p className="mb-2">All Products List</p>
          <div className="flex flex-col gap-2">
            <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b className="text-center">Delete</b>
              <b className="text-center">Edit</b>
            </div>
          </div>
          {products && products.length > 0
            ? products.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="product grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm max-sm:text-xs"
                  >
                    <img className="w-12 h-12" src={product.image} alt="" />
                    <p>{product.name}</p>
                    <p>{product.category}</p>
                    <p>{product.price}</p>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-right md:text-center cursor-pointer text-lg max-sm:mr-3"
                    >
                      X
                    </button>
                    <select
                      value={product.availability}
                      onChange={(e) => updateAvailability(e, product._id)}
                      className="border-[1px] px-2 py-2 outline-none rounded max-sm:text-xs max-sm:px-1 max-sm:py-1"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>{" "}
                  </div>
                );
              })
            : "no products"}
        </div>
      </div>
    </>
  );
};

export default ProductsList;
