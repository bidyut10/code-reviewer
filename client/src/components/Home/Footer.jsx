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
} from "lucide-react";
import logo from "../../assets/cwl.png";
import admin from "../../assets/logo.webp";
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
        <div className="fixed bottom-4 right-4 bg-black text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2">
          <div className="w-2 h-2 bg-[#50D890] rounded-full"></div>
          Thanks for subscribing!
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <img src={logo} alt="CodeWiseAI Logo" className="w-12" />
              <p className="text-gray-600 max-w-md">
                CodeWiseAI is revolutionizing code review processes with
                AI-powered insights, helping developers write better code
                through automated analysis and real-time feedback.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-normal">Created & Maintained by</h3>
              <div className="flex items-center gap-3">
                <img
                  src={admin}
                  alt="CodeWiseAI admin"
                  className="w-10 h-10 rounded-full"
                />

                <div>
                  <p className="font-medium">Bidyut Kundu</p>
                  <p className="text-sm text-gray-600">Founder & Developer</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span>India</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <span>bidyut34268@gamil.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-normal">Stay Updated</h3>
              <p className="text-gray-600">
                Get the latest updates about features and improvements
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:border-[#50D890] transition-colors"
                />
                <button
                  className="w-full bg-black hover:bg-[#50D890] text-white py-3 px-6 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"
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
                  <Twitter className="w-5 h-5 text-gray-600 hover:text-[#50D890]" />
                </a>
                <a
                  href="https://github.com/bidyut10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-black transition-colors"
                >
                  <GithubIcon className="w-5 h-5 text-gray-600 hover:text-[#50D890]" />
                </a>
                <a
                  href="https://www.producthunt.com/products/codewise-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-black transition-colors"
                >
                  <Box className="w-5 h-5 text-gray-600 hover:text-[#50D890]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <div>
              &copy; {new Date().getFullYear()} CodeWiseAI. All rights reserved.
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#50D890]">Founded 2024</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Made with{" "}
                <Heart size={14} className="text-[#50D890] fill-[#50D890]" /> in
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
