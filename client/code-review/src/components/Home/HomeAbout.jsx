import { useState } from "react";
import logo from "../../assets/1.png";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";

const HomeAbout = () => {
  // States to toggle dropdowns
  const [showMission, setShowMission] = useState(false);
  const [showWhyUs, setShowWhyUs] = useState(true); // Set to true to open by default

  const sectionStyles =
    "w-full md:w-[900px] px-[10px] md:px-[0px] mb-40 mx-auto text-center";
  const summaryStyles =
    "w-full md:w-2/3 text-xl text-start leading-relaxed mb-12 mt-4";
  const dropdownStyles =
    "bg-[#c1ff72] hover:bg-[#cfff90] transition-all duration-300 rounded-xl shadow-md p-6 mb-6 text-left";
  const dropdownTitleStyles =
    "flex justify-between items-center cursor-pointer text-2xl mb-4";
  const dropdownContentStyles = "text-lg leading-relaxed";
  const logoStyles = "w-full md:w-1/3 h-auto mb-4 md:mb-0 rounded-xl";

  return (
    <div className={sectionStyles}>
      {/* Title and Summary */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl uppercase">About</h1>
        <div className="w-full h-6 ml-4 bg-black"></div>
      </div>

      {/* Company Summary with Logo */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20">
        <p className={summaryStyles}>
          Welcome to <span className="text-black">Codewise.ai</span>, where
          innovation meets technology to streamline your development process. We
          are committed to transforming the way developers build, optimize, and
          deploy code by offering cutting-edge AI-powered solutions. Whether
          you’re looking to perform automated code reviews, speed up your
          workflow, or ensure high-quality output,{" "}
          <span className="text-black">Codewise.ai</span> is your trusted
          partner in driving productivity and excellence.
        </p>
        <img src={logo} alt="Company Logo" className={logoStyles} />
      </div>

      {/* Mission Section */}
      <div className={dropdownStyles}>
        <div
          className={dropdownTitleStyles}
          onClick={() => setShowMission(!showMission)}
        >
          <span>Our Mission</span>
          {showMission ? <SlArrowUp size={24} /> : <SlArrowDown size={24} />}
        </div>
        {showMission && (
          <ul className={dropdownContentStyles}>
            <li>• Develop tools that streamline and simplify development.</li>
            <li>• Leverage AI to offer intelligent, real-time feedback.</li>
            <li>• Drive efficiency by reducing repetitive coding tasks.</li>
            <li>
              • Ensure code quality and boost productivity for developers.
            </li>
          </ul>
        )}
      </div>

      {/* Why Us Section */}
      <div className={dropdownStyles}>
        <div
          className={dropdownTitleStyles}
          onClick={() => setShowWhyUs(!showWhyUs)}
        >
          <span>Why Us?</span>
          {showWhyUs ? <SlArrowUp size={24} /> : <SlArrowDown size={24} />}
        </div>
        {showWhyUs && (
          <ul className={dropdownContentStyles}>
            <li>
              • We provide AI-powered solutions that offer instant code
              insights, helping developers focus on creating amazing software.
            </li>
            <li>
              • Our tools are designed with a focus on clean, industry-standard
              code that reduces errors and enhances productivity.
            </li>
            <li>
              • Elevate your coding capabilities with AI-based real-time
              suggestions and improvements.
            </li>
            <li>
              • Save time by automating tedious tasks so you can concentrate on
              innovation.
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomeAbout;
