/* eslint-disable no-unused-vars */
import React from "react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import logo from "../../assets/cwl.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  };
  
  const navigation = [
    { name: "Features", href: "#feature" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-white/70 backdrop-blur-md ">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <div className="flex items-center justify-between h-16">
            <ScrollLink
              key="home"
              to="home"
              smooth={true}
              duration={1000}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img src={logo} alt="logo" className="h-6" />
            </ScrollLink>

            <div className="hidden md:flex items-center text-sm font-normal gap-8">
              {navigation.map((item) => (
                <ScrollLink
                  key={item.name}
                  to={item.href.replace("#", "")}
                  smooth={true}
                  duration={500}
                  className="text-sm cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.name}
                </ScrollLink>
              ))}
              <div className="flex items-center gap-4">
                <button
                  className="text-sm text-white bg-black px-4 pt-2 pb-2.5 rounded-lg hover:bg-[#181818] transition-all"
                  onClick={handleLogin}
                >
                  Log in
                </button>
              </div>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/70 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
            {navigation.map((item) => (
              <ScrollLink
                key={item.name}
                to={item.href.replace("#", "")}
                smooth={true}
                duration={500}
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </ScrollLink>
            ))}
            <div className="flex flex-col gap-2 pt-4 ">
              <button
                className="text-sm text-white bg-black px-4 py-3 rounded-lg hover:bg-black/90 transition-colors text-center"
                onClick={handleLogin}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
