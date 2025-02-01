import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/cwl.png";
import { useState } from "react";
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
    <div className="w-full max-w-5xl sticky top-0 bg-white border-b border-gray-50 z-50 px-[10px] md:px-[0px]">
      <div className="flex justify-between items-center py-4">
        <img src={logo} alt="Logo" className="h-6" />
        <button
          className="bg-black text-white px-4 py-2 rounded-lg hover:text-green-50 flex justify-center items-center gap-2"
          onClick={handleLogout}
          disabled={loading}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
