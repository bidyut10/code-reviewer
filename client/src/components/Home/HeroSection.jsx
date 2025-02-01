/* eslint-disable no-unused-vars */
import React from "react";
import {
  Box,
  Bug,
  Clock,
  Terminal,
  Github,
  Search,
  Code2,
  ArrowRight,
  Dock,
} from "lucide-react";
import image1 from "../../assets/users/image1.jpg";
import image2 from "../../assets/users/image2.jpg";
import image3 from "../../assets/users/image3.jpg";
import image4 from "../../assets/users/image4.jpg";
import vd from "../../assets/vd.mp4";

const HeroSection = () => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  };
  const handleProductHunt = () => {
    window.open("https://www.producthunt.com/products/codewise-ai", "_blank");
  };

  return (
    <section className="w-full max-w-5xl mx-auto py-2">
      {/* Main Grid Container */}
      <div className="grid grid-cols-12 gap-4">
        {/* Main Content - Left Column */}
        <div className="col-span-12 lg:col-span-8 grid gap-4">
          {/* Hero Text */}
          <div className="mr-0 md:mr-4 mb-8 top-0 space-y-6">
            <h1 className="text-3xl font-normal leading-loose text-center md:text-start">
              Get instant{" "}
              <span className="text-purple-400 leading-loose">
                AI-powered <br /> code reviews
              </span>{" "}
              for every GitHub commit
            </h1>
            <p className="text-gray-600 text-lg leading-loose text-center md:text-start">
              CodeWiseAI analyzes your repositories and provides detailed code
              reviews automatically with each commit, helping you maintain code
              quality effortlessly
            </p>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <button
                onClick={handleProductHunt}
                className="group flex justify-center items-center w-full md:w-auto gap-2 border-2 border-black text-black px-6 py-3 rounded-xl hover:bg-black hover:text-white  transition-all duration-300"
              >
                Featured on ProductHunt
                <Box
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={handleLogin}
                className="group flex justify-center items-center w-full md:w-auto gap-2 bg-black text-white px-6 py-4 md:py-3 rounded-xl hover:bg-purple-500 transition-all duration-300"
              >
                Try it out for free
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>

          {/* Demo Video */}
          <div className="relative overflow-hidden">
            {/* <div className=" bg-gray-50"></div> */}
            <video
              src={vd}
              className="aspect-video w-full rounded-xl"
              autoPlay="autoPlay"
              loop="true"
              muted="true"
            ></video>
          </div>
        </div>

        {/* Right Column - Stats and Process */}
        <div className="col-span-12 lg:col-span-4 grid gap-4">
          {/* How It Works Card */}
          <div className="border border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-normal mb-4">How It Works</h3>
            <div className="space-y-8">
              <div className="flex justify-start items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Github className="text-purple-400" size={20} />
                </div>
                <div>
                  <p className="font-normal">1. Connect GitHub</p>
                  <p className="text-sm text-gray-600">
                    Login with your GitHub account
                  </p>
                </div>
              </div>
              <div className="flex justify-start items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Search className="text-purple-400" size={20} />
                </div>
                <div>
                  <p className="font-normal">2. Select Repository</p>
                  <p className="text-sm text-gray-600">
                    Choose the repository to analyze
                  </p>
                </div>
              </div>
              <div className="flex justify-start items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Dock className="text-purple-400" size={20} />
                </div>
                <div>
                  <p className="font-normal">3. Get Reviews</p>
                  <p className="text-sm text-gray-600">
                    Receive insights on every commit
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Users */}
          <div className="border border-gray-200 rounded-2xl p-6">
            <div className="space-y-4">
              <div className="flex -space-x-3">
                {[image3, image1, image4, image2].map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`User ${idx + 1}`}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                    style={{
                      zIndex: 4 - idx,
                      marginLeft: idx ? "-10px" : "0",
                    }}
                  />
                ))}
              </div>
              <p className="text-gray-600">
                Join 100+ developers getting AI-powered code reviews
              </p>
            </div>
          </div>

          {/* Review Stats */}
          <div className="border border-gray-200 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-normal">Review Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Reviews Completed</span>
                <span className="text-purple-400 font-normal">1K+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Issues Found</span>
                <span className="text-purple-400 font-normal">5K+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Repositories</span>
                <span className="text-purple-400 font-normal">100+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid - Bottom Section */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="border border-gray-200 rounded-2xl p-6 hover:border-purple-400 transition-all duration-300">
            <Terminal
              className="w-8 h-8 text-purple-400 mb-4"
              strokeWidth={1}
            />
            <h3 className="text-lg font-normal mb-2">Code Analysis</h3>
            <p className="text-gray-600">In-depth review of each commit</p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 hover:border-purple-400 transition-all duration-300">
            <Clock className="w-8 h-8 text-purple-400 mb-4" strokeWidth={1} />
            <h3 className="text-lg font-normal mb-2">Instant Feedback</h3>
            <p className="text-gray-600">Real-time review on commits</p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 hover:border-purple-400 transition-all duration-300">
            <Bug className="w-8 h-8 text-purple-400 mb-4" strokeWidth={1} />
            <h3 className="text-lg font-normal mb-2">Issue Detection</h3>
            <p className="text-gray-600">Find and fix code problems</p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 hover:border-purple-400 transition-all duration-300">
            <Code2 className="w-8 h-8 text-purple-400 mb-4" strokeWidth={1} />
            <h3 className="text-lg font-normal mb-2">Best Practices</h3>
            <p className="text-gray-600">Suggestions for improvement</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
