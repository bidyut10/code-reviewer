import logo from "../assets/c.png";
const Navbar = () => {
  const handleLogin = () => {
    window.location.href = `/`;
  };
  return (
    <div className="w-full sticky top-0 bg-white z-50 px-6 md:px-40 shadow-md">
      <div className="flex justify-between items-center py-4">
        <img src={logo} alt="Logo" className="h-6" />
        <button
          className="px-6 py-1 rounded-full text-xl bg-gray-950 text-white"
          onClick={handleLogin}
        >
          <h2>Log Out</h2>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
