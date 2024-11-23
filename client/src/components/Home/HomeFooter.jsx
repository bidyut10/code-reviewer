import { FaGithub, FaInstagram } from "react-icons/fa";
import logo from "../../assets/log.png";
import { FaXTwitter } from "react-icons/fa6";

const HomeFooter = () => {
  const footerStyles =
    "bg-black text-white py-12 w-full md:w-[900px] px-[10px] md:px-[0px] rounded-t-xl";
  const containerStyles = "max-w-screen-xl mx-auto px-4";
  const sectionTitleStyles = "text-xl mb-4";
  const linkStyles = "text-gray-400 hover:text-white transition-colors";
  const socialIconsStyles =
    "flex justify-start space-x-6 text-xl text-[#c1ff72]";
  const copyrightStyles = "text-gray-100 mt-10 text-center";

  return (
    <footer className={footerStyles}>
      <div className={containerStyles}>
        {/* For Small Devices - Stacked Layout */}
        <div className="block md:hidden">
          {" "}
          {/* Show only on small screens */}
          {/* Logo and Company Info */}
          <div className="flex flex-col items-start mb-6">
            <img src={logo} alt="Company Logo" className="h-10" />
            <p className="mt-4 text-gray-400">
              Empowering developers with AI-driven tools to enhance productivity
              and code quality.
            </p>
          </div>
          {/* Social Links */}
          <div className="mb-6">
            <h3 className={sectionTitleStyles}>Follow Us</h3>
            <div className={socialIconsStyles}>
              <a rel="noopener noreferrer" aria-label="Twitter">
                <FaXTwitter />
              </a>
              <a rel="noopener noreferrer" aria-label="Github">
                <FaGithub />
              </a>
              <a rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div className="mb-6">
            <h3 className={sectionTitleStyles}>Quick Links</h3>
            <ul>
              <li>
                <a className={linkStyles}>About</a>
              </li>
              <li>
                <a className={linkStyles}>Features</a>
              </li>
              <li>
                <a className={linkStyles}>Contact</a>
              </li>
              <li>
                <a className={linkStyles}>Pricing</a>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div className="mb-6">
            <h3 className={sectionTitleStyles}>Subscribe to our Newsletter</h3>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded bg-gray-800 text-gray-400 focus:outline-none"
              />
              <button className="mt-4 w-full bg-[#c1ff72] text-black py-2 px-6 rounded hover:bg-[#a3e059] transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* For Medium and Large Devices - Original Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {" "}
          {/* Show only on medium and large screens */}
          {/* Company Logo and Social Links */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-start">
            <img src={logo} alt="Company Logo" className="h-10" />
            <p className="mt-4 text-gray-400">
              Empowering developers with AI-driven tools to enhance productivity
              and code quality.
            </p>
          </div>
          {/* Social Links */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className={sectionTitleStyles}>Follow Us</h3>
            <div className={socialIconsStyles}>
              <a rel="noopener noreferrer" aria-label="Twitter">
                <FaXTwitter />
              </a>
              <a rel="noopener noreferrer" aria-label="Github">
                <FaGithub />
              </a>
              <a rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className={sectionTitleStyles}>Quick Links</h3>
            <ul>
              <li>
                <a className={linkStyles}>About</a>
              </li>
              <li>
                <a className={linkStyles}>Features</a>
              </li>
              <li>
                <a className={linkStyles}>Contact</a>
              </li>
              <li>
                <a className={linkStyles}>Pricing</a>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h3 className={sectionTitleStyles}>Subscribe to our Newsletter</h3>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded bg-gray-800 text-gray-400 focus:outline-none"
              />
              <button className="mt-4 w-full bg-[#c1ff72] text-black py-2 px-6 rounded hover:bg-[#a3e059] transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright for all screen sizes */}
        <p className={copyrightStyles}>
          © {new Date().getFullYear()} Codewise.ai. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default HomeFooter;
