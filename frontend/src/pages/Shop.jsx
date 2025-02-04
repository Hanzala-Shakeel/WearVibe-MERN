import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const ShopPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(() => {
    // Retrieve the products from localStorage if available, or default to an empty array
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const [productsCopy, setProductsCopy] = useState();

  useEffect(() => {
    getAllProducts();
  }, []);

  function goToProduct(id) {
    navigate(`/product/${id}`);
  }

  function getAllProducts() {
    axios
      .get("https://wearvibe-backend.vercel.app/product/getallproducts")
      .then((res) => {
        setProducts(res.data);
        setProductsCopy(res.data);
        localStorage.setItem("products", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  function filterProductsByCategory(value) {
    if (value === "All") {
      // Reset to all products when "All Products" is selected
      setProducts(productsCopy);
    } else {
      const filteredProducts = productsCopy.filter((product) => {
        return product.category === value;
      });
      setProducts(filteredProducts);
    }
  }

  function filterProductByAvailability() {
    const filteredProducts = productsCopy.filter((product) => {
      return product.availability !== "Out of Stock";
    });
    setProducts(filteredProducts);
  }

  function filterProductByDiscount() {
    const filteredProducts = productsCopy.filter((product) => {
      return product.discountPrice > 0;
    });
    setProducts(filteredProducts);
  }

  function sortByPrice(e) {
    const value = e.target.value;

    if (value === "Popular") {
      // Reset to the original products (no sorting)
      setProducts(productsCopy);
    } else if (value === "Low to High") {
      // Sort by discountPrice (if greater than 0) or price in ascending order
      const sortedProducts = [...productsCopy].sort((a, b) => {
        const priceA = a.discountPrice > 0 ? a.discountPrice : a.price;
        const priceB = b.discountPrice > 0 ? b.discountPrice : b.price;
        return priceA - priceB;
      });
      setProducts(sortedProducts);
    } else if (value === "High to Low") {
      // Sort by discountPrice (if greater than 0) or price in descending order
      const sortedProducts = [...productsCopy].sort((a, b) => {
        const priceA = a.discountPrice > 0 ? a.discountPrice : a.price;
        const priceB = b.discountPrice > 0 ? b.discountPrice : b.price;
        return priceB - priceA;
      });
      setProducts(sortedProducts);
    }
  }

  return (
    <div className="min-h-screen relative">
      <Header title={"Shop."}></Header>
      <div className="w-full h-full flex items-start px-20 py-20 max-xl:px-10 max-lg:px-5 max-md:py-10 max-sm:flex-col max-sm:p-5">
        <div className="w-[25%] flex h-full flex-col items-start max-md:w-[30%] max-sm:w-full max-sm:mt-20 max-xl:text-sm">
          <div className="flex items-center gap-2 max-sm:text-sm">
            <h3>sort by</h3>
            <form>
              <select
                onChange={(e) => sortByPrice(e)}
                className="border-[1px] px-2 py-1 max-xl:text-xs"
              >
                <option value="Popular">Popular</option>
                <option value="Low to High">Low to High</option>
                <option value="High to Low">High to Low</option>
              </select>
            </form>
          </div>
          <div className="filter-parent max-sm:w-full max-sm:flex max-sm:justify-between">
            <div className="flex flex-col mt-20 max-md:mt-10 max-sm:mt-5 max-sm:text-sm">
              <button
                onClick={() => filterProductsByCategory("All")}
                className="block w-fit mb-2"
              >
                All Products
              </button>
              <button
                onClick={() => filterProductsByCategory("Men")}
                className="block w-fit mb-2"
              >
                Men Collection
              </button>
              <button
                onClick={() => filterProductsByCategory("Women")}
                className="block w-fit mb-2"
              >
                Women Collection
              </button>
              <button
                onClick={() => filterProductsByCategory("Kids")}
                className="block w-fit mb-2"
              >
                Kids Collection
              </button>
            </div>
            <div className="mt-32 max-md:mt-20 max-sm:mt-5 max-sm:text-sm">
              <p className="block w-fit mb-2">Filter by :</p>
              <button
                onClick={filterProductByAvailability}
                className="block w-fit mb-2"
              >
                Availability
              </button>
              <button
                onClick={filterProductByDiscount}
                className="block w-fit mb-2"
              >
                Discount
              </button>
            </div>
          </div>
        </div>
        <div className="w-[75%] flex flex-col gap-5 h-full max-xl:w-[80%] max-md:w-[65%] max-sm:w-full max-sm:mt-5 max-sm:mb-5">
          <div className="flex items-start gap-5 flex-wrap mb-16 max-xl:justify-center max-sm:justify-start max-xl:gap-3 max-md:gap-3 max-sm:gap-3">
            {products &&
              products.map((product, index) => {
                const originalPrice = product.price;
                const discountPrice = product.discountPrice;
                const discountPercent =
                  ((originalPrice - discountPrice) / originalPrice) * 100;

                return (
                  <div
                    key={index}
                    className="w-60 cursor-pointer border-[1px] max-lg:w-[31%] max-md:w-[45%] max-sm:w-[48%] max-xl:text-sm max-sm:text-sm"
                    onClick={() => goToProduct(product._id)}
                  >
                    <div className="w-full h-52 flex items-center justify-center bg-gray-300 overflow-hidden max-xl:h-48 max-md:h-40 max-sm:h-40">
                      <img
                        className="h-full w-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
                        src={product.image}
                        alt="Product"
                      />
                    </div>
                    <div className="flex justify-center items-center p-4 text-black text-center max-xl:p-2 max-md:p-1 max-sm:px-1">
                      <div>
                        <h3 className="max-xl:text-sm max-md:text-xs">
                          {product.name}
                        </h3>
                        {discountPrice > 0 ? (
                          <div className="price flex justify-center items-center gap-3 mt-2">
                            <h4 className="text-zinc-500">
                              Rs. {discountPrice}.00
                            </h4>
                            <p className="text-xs rounded-full bg-zinc-500 text-white px-2 py-1 max-xl:px-1 max-md:text-[8px] max-sm:px-1 max-sm:py-0">
                              {`-${discountPercent.toFixed(0)}%`}
                            </p>
                          </div>
                        ) : (
                          <h4 className="text-zinc-500 mt-2">
                            Rs. {originalPrice}.00
                          </h4>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ShopPage;
