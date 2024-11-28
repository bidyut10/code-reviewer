import { IoLogoGithub } from "react-icons/io";
import logo from "../../assets/c.png";

const HomeNavbar = () => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  };
  return (
    <div className="w-full md:w-[900px] sticky top-0 bg-white z-50 px-[10px] md:px-[0px]">
      <div className="flex justify-between items-center py-4">
        <img src={logo} alt="Logo" className="h-6" />
        <button
          className="flex items-center gap-2 px-5 py-[6px] rounded-full text-lg font-normal hover:bg-gray-950 hover:text-white bg-[#c1ff72] text-black -colors duration-700 ease-in-out"
          onClick={handleLogin}
        >
          <span>Log In</span>
          <IoLogoGithub />
        </button>
      </div>
    </div>
  );
};

export default HomeNavbar;
