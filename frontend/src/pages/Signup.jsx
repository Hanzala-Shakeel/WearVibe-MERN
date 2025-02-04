import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      axios
        .post(
          "https://wearvibe-backend.vercel.app/user/register",
          { name, email, password },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 201) {
            setIsAuthenticated(true);
            localStorage.setItem("isAuthenticated", "true");
            toast.success(res.data);
            navigate("/");
          }
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    }
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col p-10 max-sm:px-5 max-sm:py-0">
        <div className="w-full flex justify-between items-center max-sm:mt-5">
          <p className="text-3xl max-sm:text-xl font-semibold tracking-tighter">
            WearVibe.
          </p>
          <Link
            to={"/login"}
            className="text-sm max-sm:text-[10px] text-blue-500"
          >
            Already have an account?
          </Link>
        </div>
        <div className="w-full flex items-center justify-center h-full">
          <div className="w-1/3 px-20 py-10 max-sm:w-full max-sm:px-5 max-sm:py-20 max-md:w-[80%] max-lg:w-[60%] max-xl:w-1/2 max-2xl:w-[40%] rounded-md">
            <h3 className="text-4xl max-sm:text-2xl tracking-tighter">
              Welcome to{" "}
              <span className="text-blue-400 font-semibold">WearVibe</span>
            </h3>
            <h4 className="text-2xl mb-5 max-sm:text-xl tracking-tighter">
              create your account
            </h4>
            <form
              onSubmit={handleSubmit}
              className="max-sm:flex max-sm:flex-col max-sm:gap-2 max-sm:items-start"
            >
              <input
                className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200 outline-none max-sm:text-sm max-sm:px-3"
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200 outline-none max-sm:text-sm max-sm:px-3"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200 outline-none max-sm:text-sm max-sm:px-3"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="px-5 rounded-full py-3 mt-2 bg-blue-500 text-white max-sm:text-sm max-sm:px-3">
                Create My Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
