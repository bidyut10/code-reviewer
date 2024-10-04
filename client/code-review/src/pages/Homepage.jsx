import { AiOutlineGithub } from "react-icons/ai";
import { FaCode, FaClock, FaThumbsUp, FaLightbulb } from "react-icons/fa"; // React icons import
import c from "../assets/vf.jpg";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../assets/logo.png";

const HomePage = () => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  };
  const cardStyles =
    "relative rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1";
  const iconStyles =
    "absolute top-4 right-4 flex justify-center items-center rounded-full";
  const contentStyles = "p-8";
  return (
    <div className="px-4 md:px-28 lg:px-40 mt-2 flex flex-col justify-center">
      <div className="flex justify-between items-center mt-4">
        <img src={logo} alt="" className="w-fit h-6" />
        <button className="px-4 py-2 rounded-3xl bg-gray-950 text-white">
          CONTACT US
        </button>
      </div>
      <p className="text-7xl lg:text-8xl mt-28 lg:mt-24">
        Your <span className="text-[#c1ff72]">AI</span> Assistant for
      </p>
      <p className="text-7xl lg:text-8xl">Efficient Code Review</p>
      <p className="railway mt-16 lg:mt-12 text-xl">
        Receive instant, AI-driven feedback to enhance your code quality
        effortlessly.
      </p>
      <div className="my-6 lg:mt-12">
        <button
          onClick={handleLogin}
          className="flex items-center uppercase p-4 pr-6 bg-[#c1ff72] text-gray-800 text-xl rounded-full hover:bg-gray-950 hover:text-white transition duration-300"
        >
          <AiOutlineGithub className="mr-2" size={26} />
          Login With GitHub
        </button>
      </div>
      <div className="mt-12 w-full h-auto flex justify-center">
        <img src={c} alt="" className="w-full rounded-3xl" />
      </div>
      <h2 className="italiana text-3xl sm:text-4xl md:text-7xl mt-48 text-center md:text-end">
        Solving Your
      </h2>
      <h2 className="italiana text-3xl sm:text-4xl md:text-7xl mb-20 text-center md:text-end mt-4">
        <span className="text-[#c1ff72]">Code Review </span> Challenges
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 railway w-full mb-20">
        {/* Feature 1: Automated Code Review */}
        <div className={cardStyles}>
          <div className={iconStyles}>
            <FaCode size={20} />
          </div>
          <div className={contentStyles}>
            <h3 className="text-2xl md:text-3xl mb-4">Automated Code Review</h3>
            <p className="text-gray-600">
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
            <p className="text-gray-600">
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
            <p className="text-gray-600">
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
            <p className="text-gray-600">
              Our AI doesn’t just identify problems – it suggests solutions,
              helping developers continuously improve their coding skills and
              write better code.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-24 mb-8 flex flex-col sm:flex-row justify-between items-end gap-4 w-full">
        {/* Logo Section */}
        <img src={logo} alt="" className="w-fit h-6 mt-4" />

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
              className=" hover:text-[#c1ff72] transition-colors duration-300"
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter
              size={24}
              className=" hover:text-[#c1ff72] transition-colors duration-300"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram
              size={24}
              className=" hover:text-[#c1ff72] transition-colors duration-300"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
