// eslint-disable-next-line no-unused-vars
import React from "react";
import image1 from "../../assets/users/image1.jpg";
import image2 from "../../assets/users/image2.jpg";
import image3 from "../../assets/users/image3.jpg";
import image4 from "../../assets/users/image4.jpg";
import CodeReview from "./CodeReview";
import { ArrowUpRight } from "lucide-react";

const Home = () => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  };

  return (
    <main
      id="home"
      className="w-full flex justify-center items-center pt-40 md:pt-56"
    >
      <div className="w-full max-w-7xl px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-start top-0 gap-8">
          <div className="w-full md:w-1/2 flex flex-col justify-between h-full">
            <div className="space-y-6 mb-8 md:mb-16">
              <div className="relative">
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
                  We help developers
                  <span className="relative inline-block mt-3">
                    make our{" "}
                    <span className="border-b-2 border-[#c1ff72] pb-1">
                      code better
                    </span>
                    <div className="absolute -right-6 -bottom-2 w-12 h-12 bg-gradient-to-br from-indigo-300/20 to-pink-300/20 rounded-full blur-lg"></div>
                  </span>
                </h1>
              </div>

              <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-lg">
                We&apos;re an AI-powered code review platform that integrates
                with GitHub, providing automated insights to improve code
                quality and help developers write better code with every commit.
              </p>
            </div>

            <div className="flex flex-col space-y-8 mt-auto">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <button
                  className="w-full sm:w-auto bg-black text-white rounded-xl px-6 sm:px-8 py-3.5 text-lg font-normal shadow-lg hover:shadow-xl hover:bg-[#121212] transition-all duration-300 flex items-center justify-center sm:justify-start gap-2"
                  onClick={handleLogin}
                >
                  <span>Try It Now</span>
                  <ArrowUpRight />
                </button>

                <div className="group w-full sm:w-auto">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      <img
                        src={image3}
                        alt="User"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm transition-transform group-hover:scale-105"
                      />
                      <img
                        src={image1}
                        alt="User"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm transition-transform group-hover:scale-105"
                      />
                      <img
                        src={image4}
                        alt="User"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm transition-transform group-hover:scale-105"
                      />
                      <img
                        src={image2}
                        alt="User"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm transition-transform group-hover:scale-105"
                      />
                      <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-gray-50 text-xs font-medium text-gray-500 shadow-sm transition-transform group-hover:scale-105">
                        50+
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-400 font-normal">
                      users improving their code
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                  <span className="text-xs sm:text-sm text-gray-500">
                    Fast reviews
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#c1ff72]"></div>
                  <span className="text-xs sm:text-sm text-gray-500">
                    AI-powered
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span className="text-xs sm:text-sm text-gray-500">
                    GitHub integration
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <CodeReview />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
