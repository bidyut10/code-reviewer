// eslint-disable-next-line no-unused-vars
import React from "react";
import logo from "../../assets/cwl.png";

const CWNavbar = () => {
  const handleLogin = () => {
    window.location.href =  `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  };
  return (
    <nav className="w-full bg-white border-b border-gray-50 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto py-4">
        <div className="flex justify-between items-center">
          <img src={logo} alt="logo" className="h-6" />

            <button
              className="bg-black text-white px-6 py-2 rounded-lg hover:text-purple-50 flex justify-center items-center gap-2"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
      </div>
    </nav>
  );
};

export default CWNavbar;
