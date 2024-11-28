import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/c.png";
import { useState } from "react";
import { IoMdLogOut } from "react-icons/io";
const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full sticky top-0 bg-white z-50 px-6 md:px-40 shadow-md">
      <div className="flex justify-between items-center py-4">
        <img src={logo} alt="Logo" className="h-6" />
        <button
          className={`flex items-center gap-2 px-5 py-[6px] rounded-full text- font-normal
            ${
              loading
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-[#1e1e1f] text-white hover:bg-[#000000]"
            } -colors duration-700 ease-in-out`}
          onClick={handleLogout}
          disabled={loading}
        >
          <IoMdLogOut />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
