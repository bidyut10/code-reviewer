import logo from "../assets/logo.png";
const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-40 py-2 mt-2">
      <img src={logo} alt="" className="w-fit h-6" />
      <button className="px-4 py-2 rounded-3xl uppercase bg-gray-950 text-white">
        logout
      </button>
    </div>
  );
};

export default Navbar;
