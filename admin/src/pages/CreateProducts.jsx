import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    discountPrice: 0,
    availability: "In Stock",
    category: "Men",
  });

  const [image, setImage] = useState(null);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Disable the feature and show a toast notification
    toast.error("This feature is disabled");

    // const data = new FormData();
    // data.append("formData", JSON.stringify(formData));
    // data.append("image", image);

    // if (data) {
    //   axios
    //     .post("http://localhost:3000/product/createproduct", data, {
    //       withCredentials: true,
    //     })
    //     .then((res) => toast.success(res.data))
    //     .catch((err) => toast.error(err.response.data));
    // }
  }

  return (
    <>
      <Header></Header>
      <div className="flex flex-col">
        <div className="container p-20 flex flex-grow max-sm:p-0">
          <Sidebar></Sidebar>
          <main className="w-3/4 h-full bg-white px-8 py-5 shadow ml-4 flex flex-col gap-20 max-sm:w-full max-sm:ml-0 max-sm:px-5 max-sm:gap-5 max-sm:mt-20">
            <h2 className="text-2xl font-normal mb-4 max-sm:text-base">
              Create New Product
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 tracking-tight max-sm:text-base">
                  Product Details
                </h3>
                <div className="mb-4 flex items-center max-sm:w-full">
                  <label className="block font-medium max-sm:text-xs max-sm:w-1/2">
                    Product Image
                  </label>
                  <input
                    type="file"
                    className="py-2 px-4 rounded outline-none max-sm:px-2 max-sm:py-1 max-sm:text-xs max-sm:w-full"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="border p-2 rounded w-full outline-none max-sm:text-xs"
                    name="name"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Product Price"
                    className="border p-2 rounded w-full outline-none max-sm:text-xs"
                    name="price"
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    type="text"
                    placeholder="Description"
                    className="border p-2 rounded w- resize-none outline-none max-sm:text-xs"
                    name="description"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 max-sm:text-sm">
                  Panel Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Discount Price"
                    className="border p-2 rounded w-full outline-none max-sm:text-xs"
                    name="discountPrice"
                    onChange={handleChange}
                    required
                  />
                  <select
                    name="availability"
                    className="border-[1px] px-2 py-1 outline-none rounded max-sm:text-xs"
                    disabled
                    required
                  >
                    <option>In Stock</option>
                  </select>
                  <select
                    name="category"
                    className="border-[1px] px-2 py-2 outline-none rounded max-sm:text-xs"
                    onChange={handleChange}
                    required
                  >
                    <option>Men</option>
                    <option>Women</option>
                    <option>Kids</option>
                  </select>
                </div>
              </div>
              <button
                className="px-5 py-2 rounded mt-5 bg-blue-500 text-white outline-none max-sm:text-sm max-sm:px-3"
                type="submit"
              >
                Create New Product
              </button>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default CreateProducts;
