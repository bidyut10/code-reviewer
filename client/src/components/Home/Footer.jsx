// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import logo from "../../assets/cwl.png";
import { Box, GithubIcon, SendHorizonal, Twitter } from "lucide-react";

const Footer = () => {
  const [showToast, setShowToast] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); 
  };
  return (
    <footer className="w-full py-16">
      {showToast && (
        <div className="absolute top-20 z-50 right-4 bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg transition-transform animate-fade-in-out">
          Subscription Successful!
        </div>
      )}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col">
          <img src={logo} alt="Company Logo" className="w-12 mb-4" />
          <p className="text-lg text-gray-800">
            Empowering developers with AI-driven tools to enhance productivity
            and code quality.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-normal mb-4 ">Follow Us</h3>
          <div className="flex space-x-6">
            <a
              href="https://x.com/BidyutKundu12"
              target="_blank"
              className="text-purple-400 hover:text-black transition-transform transform hover:scale-110"
            >
              <Twitter />
            </a>
            <a
              href="https://github.com/bidyut10"
              target="_blank"
              className="text-purple-400 hover:text-black transition-transform transform hover:scale-110"
            >
              <GithubIcon />
            </a>
            <a
              href="https://www.producthunt.com/products/codewise-ai"
              target="_blank"
              className="text-purple-400 hover:text-black transition-transform transform hover:scale-110"
            >
              <Box />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-normal mb-4 ">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a className="text-gray-400 hover:text-black">Docs</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-normal mb-4">Stay Connected</h3>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-xl bg-white border-2 border-purple-400 text-gray-800 focus:outline-none"
            />
            <button
              className="mt-4 w-full flex justify-center items-center gap-3 bg-black text-white py-3 px-6 rounded-xl transition-all"
              type="submit"
            >
              Subscribe <SendHorizonal size={16} strokeWidth={1.5} />
            </button>
          </form>
        </div>
      </div>
      <div className="mt-12 text-center text-sm text-gray-800 border-t border-gray-50 pt-4">
        &copy; {new Date().getFullYear()} Codewise.ai. All Rights Reserved.
      </div>
    </footer>
  );
};
export default Footer;
