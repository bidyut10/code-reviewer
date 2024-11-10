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
          className="px-6 py-1 rounded-full text-xl bg-gray-950 text-white"
          onClick={handleLogin}
        >
          <h2>Log In</h2>
        </button>
      </div>
    </div>
  );
};

export default HomeNavbar;
