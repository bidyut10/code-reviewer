import { FaCode, FaClock, FaThumbsUp, FaLightbulb } from "react-icons/fa"; // React icons import
import c from "../assets/vd.mp4";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

const HomePage = () => {
  // Common styles for feature cards
  const cardStyles =
    "relative bg-gradient-to-r from-pink-600 to-gray-700 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1";
  const iconStyles =
    "absolute top-4 right-4 text-white flex justify-center items-center rounded-full";
  const contentStyles = "p-8";

  return (
    <div className="text-gray-800 min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 lg:px-40 pt-32">
      {/* Header Section */}
      <div className="">
        <div className="flex italiana flex-col sm:flex-row justify-evenly items-end gap-4">
          <p className="text-5xl sm:text-8xl w-full sm:w-4/5 text-center sm:text-left">
            Your <span className="text-pink-600">AI</span> Assistant for <br />{" "}
            Efficient Code Review
          </p>
          <p className="text-md w-full sm:w-1/5 text-center sm:text-left railway">
            Receive instant, AI-driven feedback to enhance your code quality
            effortlessly.
          </p>
        </div>
      </div>

      {/* Video Section */}
      <div className="mt-4 sm:mt-8 lg:mt-12 w-full h-auto flex justify-center">
        <video
          src={c}
          autoPlay
          loop
          muted
          playsInline
          className="w-full rounded-3xl"
        />
      </div>

      {/* Features Section */}
      <h2 className="italiana text-3xl sm:text-4xl md:text-7xl text-gray-900 mt-48 mb-20 text-center md:text-end">
        Solving Your Code Review Challenges
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 railway w-full mb-20">
        {/* Feature 1: Automated Code Review */}
        <div className={cardStyles}>
          <div className={iconStyles}>
            <FaCode size={20} />
          </div>
          <div className={contentStyles}>
            <h3 className="text-2xl md:text-3xl mb-4">Automated Code Review</h3>
            <p className="text-gray-100">
              Our AI-powered tool helps developers catch issues early, ensuring
              clean and optimized code. No more manual reviews of endless lines
              of code – we take care of it for you.
            </p>
          </div>
        </div>

        {/* Feature 2: Save Time & Boost Productivity */}
        <div className={cardStyles}>
          <div className={iconStyles}>
            <FaClock size={20} />
          </div>
          <div className={contentStyles}>
            <h3 className="text-2xl md:text-3xl mb-4">
              Save Time & Boost Productivity
            </h3>
            <p className="text-gray-100">
              Focus on writing great code, not on fixing minor issues. Our AI
              provides real-time feedback, allowing you to spend more time
              building features and less time debugging.
            </p>
          </div>
        </div>

        {/* Feature 3: Enhance Code Quality */}
        <div className={cardStyles}>
          <div className={iconStyles}>
            <FaThumbsUp size={20} />
          </div>
          <div className={contentStyles}>
            <h3 className="text-2xl md:text-3xl mb-4">Enhance Code Quality</h3>
            <p className="text-gray-100">
              With objective feedback, our AI ensures that your code meets
              industry standards, leading to cleaner and more maintainable
              codebases.
            </p>
          </div>
        </div>

        {/* Feature 4: AI-Powered Suggestions */}
        <div className={cardStyles}>
          <div className={iconStyles}>
            <FaLightbulb size={20} />
          </div>
          <div className={contentStyles}>
            <h3 className="text-2xl md:text-3xl mb-4">
              AI-Powered Suggestions
            </h3>
            <p className="text-gray-100">
              Our AI doesn’t just identify problems – it suggests solutions,
              helping developers continuously improve their coding skills and
              write better code.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-24 mb-8 flex flex-col sm:flex-row justify-between items-end gap-4 w-full">
        {/* Logo Section */}
        <p className="text-2xl signature text-start bg-gradient-to-r from-pink-600 to-gray-900 text-transparent bg-clip-text">
          codewise.ai
        </p>

        {/* Copyright Section */}
        <p className="text-center md:text-left  mt-2 md:mt-0">
          &copy; {new Date().getFullYear()} Codewise. All rights reserved.
        </p>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub
              size={24}
              className=" hover:text-pink-600 transition-colors duration-300"
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter
              size={24}
              className=" hover:text-pink-600 transition-colors duration-300"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram
              size={24}
              className=" hover:text-pink-600 transition-colors duration-300"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
