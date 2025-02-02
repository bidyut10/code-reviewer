/* eslint-disable no-unused-vars */
import React from "react";
import {ArrowRight, CheckCircle } from "lucide-react";

const TokenInfo = () => {
  const handleSignupRedirect = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  };

  return (
    <div className="w-full max-w-5xl flex flex-col justify-center items-center px-4 md:px-60 py-4 md:py-28 rounded-xl text-black shadow-lg">
      {/* Headline Section */}
      <h1 className="text-3xl text-black mb-8">Token-Based Code Review</h1>

      {/* Token Information Section */}
      <div className="w-full max-w-5xl rounded-xl text-black">
        <ul className=" space-y-4">
          <li className="flex gap-3 items-center">
            <CheckCircle className="text-[#c1ff72] w-4 h-4" />
            <span>Get 10 free tokens upon signup.</span>
          </li>
          <li className="flex gap-3 items-center">
            <CheckCircle className="text-[#c1ff72] w-4 h-4" />
            <span>1 token = 1 code review.</span>
          </li>
          <li className="flex gap-3 items-center">
            <CheckCircle className="text-[#c1ff72] w-4 h-4" />
            <span>Purchase additional tokens at $1 per token.</span>
          </li>
          <li className="flex gap-3 items-center">
            <CheckCircle className="text-[#c1ff72] w-4 h-4" />
            <span>No subscription — buy only what you need.</span>
          </li>
        </ul>

        {/* Call to Action */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6">
          <button
            onClick={handleSignupRedirect}
            className="group flex justify-center items-center w-full md:w-auto gap-2 bg-black text-white px-6 py-4 md:py-3 rounded-xl hover:bg-[#c1ff72] transition-all duration-300"
          >
            Sign Up & Get Free Tokens
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-black">$1 per token after free credits</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
