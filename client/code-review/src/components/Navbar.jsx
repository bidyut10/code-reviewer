import { AiOutlineGithub } from "react-icons/ai";
const Navbar = () => {
    const handleLogin = () => {
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
    };
  return (
    <div className="flex justify-between items-center px-40 py-2 mt-2">
      <p className="text-3xl signature text-start bg-gradient-to-r from-pink-500  to-gray-900 text-transparent bg-clip-text">
        codewise.ai
      </p>
      <div className="flex justify-center items-center gap-4">
        <div className="flex justify-center">
          <button
            onClick={handleLogin}
            className="flex items-center px-4 py-2 bg-pink-600 text-white font-normal text-md rounded-full hover:bg-pink-700 transition duration-300"
          >
            <AiOutlineGithub className="mr-2" size={24} />
            Login With GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
