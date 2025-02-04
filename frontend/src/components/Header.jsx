import { useState } from "react";
import { Link } from "react-router-dom";
import menuIcon from "../assets/menu-3-line.png";
import closeIcon from "../assets/close-line.png";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Header = ({ title }) => {
  // State to track if the menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { cart } = useContext(CartContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  // Function to toggle the menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function logout() {
    axios
      .post("https://wearvibe-backend.vercel.app/user/logout", {}, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setIsAuthenticated(false);
          localStorage.removeItem("isAuthenticated");
          toast.success(res.data);
        }
      })
      .catch((err) => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
        toast.error(err.response.data);
      });
  }

  return (
    <>
      <div className="header max-sm:fixed max-sm:top-0 max-sm:w-full max-sm:bg-white z-10">
        <div className="nav w-full flex justify-between items-center px-20 py-5 max-sm:px-5 max-xl:px-10 max-lg:px-5 max-lg:text-sm">
          <div>
            <h1 className="text-3xl tracking-tighter max-lg:text-xl max-sm:text-xl">
              <Link to={"/"}>{title}</Link>
              <span className="ml-10 tracking-normal">
                <Link
                  className="border px-5 text-xs py-1 rounded-full"
                  to={"https://wearvibe-admin.vercel.app"}
                  target="_blank"
                >
                  Admin Panel
                </Link>
              </span>
            </h1>
          </div>
          {/* Nav items with conditional classes for sliding effect */}
          <div
            className={`nav-items flex gap-10 transition-all duration-500 max-sm:justify-center max-sm:gap-3 max-sm:p-5 max-sm:absolute max-sm:top-0 max-sm:w-1/2 max-sm:flex-col max-sm:bg-zinc-200 max-sm:text-zinc-600 max-sm:h-screen ${
              isMenuOpen ? "max-sm:left-0" : "max-sm:left-[-300px]"
            }`}
          >
            <div className="item flex gap-5 max-sm:flex-col max-sm:gap-3">
              <Link to={"/"}>Home</Link>
              <Link to={"/cart"}>
                Cart{" "}
                {cart.length === 0 ? (
                  ""
                ) : (
                  <sup className="bg-black px-1 rounded-full text-white">
                    {cart.length}
                  </sup>
                )}
              </Link>
            </div>
            <div className="item flex gap-5 max-sm:flex-col items-start max-sm:gap-3">
              <Link to={isAuthenticated ? "/order" : "/login"}>My Orders</Link>
              {isAuthenticated ? (
                <button onClick={logout}>Logout</button>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </div>
          </div>
          {/* Menu/Close icon */}
          <div className="hidden max-sm:block">
            <img
              src={isMenuOpen ? closeIcon : menuIcon}
              alt="Menu Icon"
              onClick={toggleMenu}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full flex justify-center px-20 max-xl:px-10 max-sm:px-5 max-lg:px-5">
          <div className="w-[100%] h-[2px] bg-zinc-500 px-10"></div>
        </div>
      </div>
    </>
  );
};

export default Header;
