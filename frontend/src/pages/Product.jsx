import Header from "../components/Header";
import Footer from "../components/Footer";
import cartimage from "../assets/cart.png";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductImageSection from "../components/ProductImageSection";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null); // state to track selected size
  const { addToCart } = useContext(CartContext);

  const sizes = ["S", "M", "L"];

  const handleSizeClick = (size) => {
    setSelectedSize(size); // save selected size
  };

  useEffect(() => {
    getProductData();
  }, []);

  function getProductData() {
    // Check if product data is available in localStorage
    const savedProducts = JSON.parse(localStorage.getItem("products")); // Assuming products are stored under the key 'products'

    if (savedProducts) {
      const product = savedProducts.find((p) => p._id === productId); // Match product based on productId
      if (product) {
        setProduct(product);
        return;
      }
    }
    axios
      .get(`https://wearvibe-backend.vercel.app/product/getproduct/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  function handleAddToCart() {
    if (!selectedSize) {
      toast("Please select a size");
      return;
    } else if (product.availability === "Out of Stock") {
      toast("This product is out of stock");
      return;
    }
    addToCart(product, quantity, selectedSize);
  }

  return (
    <div className="relative min-h-screen">
      <Header title={"Shop."}></Header>
      <div className="flex w-full p-20 mt-10 max-md:flex-col max-md:p-10 max-md:mt-5 max-md:items-center max-sm:p-5 max-sm:mt-10">
        <ProductImageSection image={product && product.image} />
        <div className="w-1/2 p-2 max-md:w-full max-sm:mt-6">
          <div className="product-title font-semibold max-sm:text-md max-sm:tracking-tight">
            {product && product.name}
          </div>
          <div className="product-price text-xl mt-1 max-sm:text-md">
            {product && product.discountPrice ? (
              <>
                <span className="text-zinc-500 mr-2 line-through">
                  Rs.{product.price}.00{" "}
                </span>
                <span className="text-red-500">
                  Rs.{product.discountPrice}.00
                </span>
              </>
            ) : (
              <span className="text-zinc-500">
                Rs.{product && product.price}.00
              </span>
            )}
          </div>
          <div className="availibilty text-sm mt-5 max-sm:text-[12px] max-sm:mt-3">
            Availability: {product && product.availability}
          </div>
          <div className="size text-sm mt-5 flex gap-3">
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => handleSizeClick(size)} // handle click event
                className={`w-10 h-10 rounded flex items-center justify-center cursor-pointer max-sm:w-8 max-sm:h-8 max-sm:text-xs ${
                  selectedSize === size
                    ? "bg-zinc-900 text-white"
                    : "bg-zinc-300 text-black"
                }`}
              >
                {size}
              </div>
            ))}
          </div>
          <div className="cart w-full flex gap-5 mt-5 max-sm:gap-3">
            <div className="quantity-button flex items-center justify-between px-5 w-[15%] h-10 border-[1px] border-black rounded-3xl text-lg font-medium max-2xl:w-[30%] max-lg:w-[35%] max-sm:w-[40%] max-sm:h-9 max-sm:text-sm">
              <button
                onClick={() =>
                  quantity !== 1 ? setQuantity(quantity - 1) : null
                }
              >
                -
              </button>
              <p>{quantity}</p>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button
              onClick={handleAddToCart}
              className="cart-button flex items-center justify-center text-white px-5 w-[70%] h-10 bg-zinc-800 rounded-3xl text-md font-medium max-lg:text-xs max-lg:w-[60%] max-sm:h-9 max-sm:text-xs"
            >
              <img className="mx-3 max-sm:w-5" src={cartimage} alt="" />
              ADD TO CART
            </button>
          </div>
          <div className="description mt-10 flex flex-col gap-8 text-zinc-600 text-sm leading-5 max-sm:gap-5">
            <h1 className="text-zinc-900 bg-zinc-200 p-2">Description</h1>
            <p className="max-sm:text-xs">{product && product.description}</p>
          </div>
          <div className="tags w-full mt-10 flex flex-col gap-1 text-zinc-500 text-[12px] leading-5 max-md:mb-20 max-sm:text-[11px] max-sm:gap-0 max-sm:mt-8">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Product;
