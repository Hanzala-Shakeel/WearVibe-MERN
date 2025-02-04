import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import menuIcon from "../assets/menu-3-line.png";
import closeIcon from "../assets/close-line.png";
import axios from "axios";
import { useAuth } from "../context/authContext";

const Header = () => {
  const { setIsAuthenticated } = useAuth();

  // State to track if the menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function logout() {
    axios
      .post("https://wearvibe-backend.vercel.app/owner/logout", {}, { withCredentials: true })
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
        <div className="nav w-full flex justify-between items-center px-20 py-5 max-sm:px-5">
          <div className="w-full flex justify-between">
            <h1 className="text-3xl tracking-tighter max-sm:text-xl">
              Admin Panel.
            </h1>
            <button onClick={logout} className="max-sm:hidden">
              logout
            </button>
          </div>
          {/* Nav items with conditional classes for sliding effect */}
          <div
            className={`nav-items flex transition-all duration-500 max-sm:items-center max-sm:p-5 max-sm:absolute max-sm:top-0 max-sm:w-1/2 max-sm:bg-zinc-200 max-sm:text-zinc-600 max-sm:h-screen ${
              isMenuOpen ? "max-sm:left-0" : "max-sm:left-[-300px]"
            }`}
          >
            <div className="item flex items-start gap-3 max-sm:flex-col sm:hidden">
              <Link to={"/allproducts"} className="block w-fit mb-2">
                All Products
              </Link>
              <Link to={"/createproducts"} className="block w-fit mb-2">
                Create Products
              </Link>
              <Link to={"/orders"} className="block w-fit mb-2">
                Orders
              </Link>
              <button onClick={logout} className="text-zinc-900">
                logout
              </button>
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
        <div className="w-full flex justify-center px-20 max-sm:px-5">
          <div className="w-[100%] h-[2px] bg-zinc-500 px-10"></div>
        </div>
      </div>
    </>
  );
};

export default Header;
