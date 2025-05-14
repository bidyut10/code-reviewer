/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  GithubIcon,
  Twitter,
  SendHorizonal,
  Mail,
  MapPin,
  Heart,
  ArrowUpRight,
} from "lucide-react";
import logo from '../../assets/cwl.png'
const Footer = () => {
const [showToast, setShowToast] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  const profilePage = () => {
    window.open("https://bidyutkundu.netlify.app/", "_blank");
  };
  return (
    <footer id="contact" className="w-full pt-36 text-md bg-[#c1ff72]">
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2">
          <div className="w-2 h-2 bg-[#c1ff72] rounded-full"></div>
          Thanks for subscribing!
        </div>
      )}

      <div className="mx-auto flex justify-center items-center w-full flex-col">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16  px-4 md:px-0 w-full max-w-7xl">
          {/* Company Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <img src={logo} alt="CodeWiseAI Logo" className="w-12" />
              <p className="text-gray-800 max-w-md">
                CodeWiseAI is revolutionizing code review processes with
                AI-powered insights, helping developers write better code
                through automated analysis and real-time feedback.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-normal">Created & Maintained by</h3>
              <div className="flex items-center gap-3">
                <div className="space-y-2">
                  <div
                    className="flex items-center  underline underline-offset-2 cursor-pointer"
                    onClick={profilePage}
                  >
                    <p className="text-md font-medium">Bidyut Kundu</p>
                    <ArrowUpRight size={18} />
                  </div>
                  <p className="text-sm">Founder & Developer</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-800">
                <MapPin size={16} />
                <span>India</span>
              </div>
              <div className="flex items-center gap-2 text-gray-800">
                <Mail size={16} />
                <span>bidyut.kundu.dev@gamil.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-normal">Stay Updated</h3>
              <p className="text-gray-800">
                Get the latest updates about features and improvements
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:border-[#c1ff72] transition-colors"
                />
                <button
                  className="w-full bg-black hover:bg-[#131313] text-white py-3 px-6 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"
                  type="submit"
                >
                  Subscribe
                  <SendHorizonal size={16} />
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="font-normal">Connect With Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://x.com/BidyutKundu12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-black transition-colors"
                >
                  <Twitter className="w-5 h-5 text-gray-800 hover:text-[#c1ff72]" />
                </a>
                <a
                  href="https://github.com/bidyut10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-black transition-colors"
                >
                  <GithubIcon className="w-5 h-5 text-gray-800 hover:text-[#c1ff72]" />
                </a>
                <a
                  href="https://www.producthunt.com/products/codewise-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-black transition-colors"
                >
                  <Box className="w-5 h-5 text-gray-800 hover:text-[#c1ff72]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[#c1ff72] flex justify-center items-center  px-4 md:px-0 py-16 w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-md text-[#181818] w-full max-w-7xl">
            <div>
              &copy; {new Date().getFullYear()} CodewiseAI. All rights reserved.
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#181818]">Founded 2024</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Made with{" "}
                <Heart size={14} className="text-[#181818] fill-[#181818]" /> in
                India
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
