import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="w-[25%] flex h-full flex-col items-start max-sm:hidden">
        <div className="flex flex-col">
          <Link to={"/allproducts"} className="block w-fit mb-2">
            All Products
          </Link>
          <Link to={"/createproducts"} className="block w-fit mb-2">
            Create new product
          </Link>
          <Link to={"/orders"} className="block w-fit mb-2">
            Orders
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
