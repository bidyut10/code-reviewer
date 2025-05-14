// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { Code, GitBranch, Github, Rocket, SquareTerminal } from 'lucide-react';
import logo from "../../assets/cwl.png";

const CodeReview = () => {
      const [scrolled, setScrolled] = useState(false);
      const [step, setStep] = useState(1);
      const [progress, setProgress] = useState(0);
      const [connecting, setConnecting] = useState(false);
      const [connected, setConnected] = useState(false);
      const [loadingFiles, setLoadingFiles] = useState(false);
    
      useEffect(() => {
        const handleScroll = () => {
          const isScrolled = window.scrollY > 10;
          if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
          }
        };
    
        document.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
          document.removeEventListener("scroll", handleScroll);
        };
      }, [scrolled]);
    
      // Handle step transitions with animations
      useEffect(() => {
        if (step === 1) {
          // Start connecting animation after a delay
          const connectingTimer = setTimeout(() => {
            setConnecting(true);
    
            // After 1.5s, show connected state
            const connectedTimer = setTimeout(() => {
              setConnected(true);
    
              // Move to step 2 after showing connected
              const nextStepTimer = setTimeout(() => {
                setStep(2);
                setConnecting(false);
                setConnected(false);
              }, 1500);
    
              return () => clearTimeout(nextStepTimer);
            }, 1500);
    
            return () => clearTimeout(connectedTimer);
          }, 1000);
    
          return () => clearTimeout(connectingTimer);
        }
    
        if (step === 2) {
          // Show loading files animation
          setLoadingFiles(true);
    
          // Move to step 3 after file loading
          const fileLoadingTimer = setTimeout(() => {
            setLoadingFiles(false);
            setStep(3);
            // Start progress animation
            setProgress(0);
          }, 3000);
    
          return () => clearTimeout(fileLoadingTimer);
        }
    
        if (step === 3) {
          // Animate progress bar from 0 to 100%
          const progressInterval = setInterval(() => {
            setProgress((prev) => {
              if (prev >= 100) {
                clearInterval(progressInterval);
    
                // Reset to step 1 after completion
                const resetTimer = setTimeout(() => {
                  setStep(1);
                }, 2000);
    
                return 100;
              }
              return prev + 2;
            });
          }, 50);
    
          return () => clearInterval(progressInterval);
        }
      }, [step]);
  return (
      <div className="w-full h-[750px]">
        <div className=" bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl h-2/3 w-full">
          <div className="top-0 left-0 right-0 h-10 md:h-12 bg-gray-100/70 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>

          <div className="mt-12 p-4 md:p-6 space-y-4 md:space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white px-1 py-[7px] rounded-full">
                <img src={logo} alt="logo" className="h-3" />
              </div>
              <div className="bg-gray-50/50 text-[#5c5e5e] px-4 py-1 rounded-full text-sm">
                {step === 1
                  ? "Connecting"
                  : step === 2
                  ? "Selecting"
                  : "Analyzing"}
              </div>
            </div>

            {/* Step 1: Connect to GitHub */}
            {step === 1 && (
              <div className="space-y-4 transition-opacity duration-300">
                <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-gray-200 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Github
                        size={16}
                        className="text-[#2d2c2c]"
                        strokeWidth={1.8}
                      />
                      <span className="font-normal font-sm text-[#2d2c2c]">
                        Connect to GitHub
                      </span>
                    </div>
                    {connected && (
                      <div className="flex items-center gap-1 text-green-400 text-xs font-normal">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        Connected
                      </div>
                    )}
                  </div>
                  <p className="text-xs">
                    Connect your GitHub account to get started with automated
                    code reviews
                  </p>
                  <div className="mt-4">
                    {!connecting && !connected ? (
                      <button className="bg-[#2d2c2c] text-gray-100 px-4 py-2 rounded-md text-sm font-normal flex items-center gap-2 transition-all hover:bg-gray-800 cursor-none">
                        <Github
                          size={15}
                          className="text-[#eeeded]"
                          strokeWidth={2}
                        />
                        Authorize GitHub
                      </button>
                    ) : connecting && !connected ? (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-black rounded-full"></div>
                        Connecting to GitHub...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-green-400">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        GitHub Connected Successfully
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Select Repository */}
            {step === 2 && (
              <div className="space-y-4 transition-opacity duration-300">
                <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-gray-200 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <GitBranch size={14} className="text-[#2d2c2c]" />
                    <span className="font-normal text-sm">
                      Select Repository
                    </span>
                  </div>

                  {loadingFiles ? (
                    <div className="space-y-3 my-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="h-4 bg-gray-300 rounded w-48 animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="h-4 bg-gray-300 rounded w-40 animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="h-4 bg-gray-300 rounded w-52 animate-pulse"></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Loading repositories...
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 mt-3">
                      <div className="bg-gray-50/70 p-2 rounded-md flex items-center gap-2 hover:bg-gray-100/70 transition-colors">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">user/repository-name</span>
                      </div>
                      <div className="bg-gray-50/70 p-2 rounded-md flex items-center gap-2 hover:bg-gray-100/70 transition-colors">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">user/another-project</span>
                      </div>
                      <div className="bg-gray-50/70 p-2 rounded-md flex items-center gap-2 hover:bg-gray-100/70 transition-colors border-2 border-[#c1ff72]">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-sm">user/selected-project</span>
                        <span className="ml-auto text-xs text-[#c1ff72] font-normal">
                          Selected
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: AI Code Review */}
            {step === 3 && (
              <div className="space-y-4 transition-opacity duration-300">
                <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-gray-200 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Code size={16} className="text-[#2d2c2c]" />
                    <span className="font-normal text-sm text-[#2d2c2c]">
                      Code Review in Progress
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#c1ff72] rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {progress < 30
                        ? "Analyzing code patterns..."
                        : progress < 60
                        ? "Identifying potential improvements..."
                        : progress < 90
                        ? "Generating suggestions..."
                        : "Review complete"}
                    </p>
                  </div>
                </div>

                <div
                  className={`bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-gray-200 transition-all duration-300 ${
                    progress > 40 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <SquareTerminal size={14} className="text-[#2d2c2c]" />
                    <span className="font-normal text-sm">
                      Performance Suggestion
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Consider using memoization for this component to prevent
                    unnecessary re-renders
                  </p>
                </div>

                <div
                  className={`bg-white/40 backdrop-blur-sm rounded-lg p-4 border border-gray-200 transition-all duration-300 ${
                    progress > 75 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Rocket size={14} className="text-[#2d2c2c]" />
                    <span className="font-normal text-sm">Best Practice</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Add error handling to async operations for better UX
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}

export default CodeReview