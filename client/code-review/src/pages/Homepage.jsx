import { AiOutlineGithub } from "react-icons/ai";

const HomePage = () => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-96">
      <div className="text-center space-y-4">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-xl font-medium text-start uppercase pt-2 pb-20 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
          Code Reviewer
        </p>

        <p className="text-lg sm:text-xl md:text-2xl lg:text-5xl font-medium uppercase bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Automated AI Code Reviewer
        </p>

        <p className="text-lg sm:text-xl md:text-xl lg:text-xl font-medium text-gray-800">
          Get instant feedback on your code quality with our AI-powered
          automatic code review check.
        </p>

        <div className="flex justify-center pt-16">
          <button
            onClick={handleLogin}
            className="flex items-center px-6 py-3 bg-pink-600 text-white font-medium text-xl rounded-full shadow-lg hover:bg-pink-700 transition duration-300"
          >
            <AiOutlineGithub className="mr-2" />
            Login With GitHub
          </button>
        </div>
      </div>

      <div className="mt-4 sm:mt-8 lg:mt-12 w-full h-2/2 flex justify-center">
        <img
          src="https://today.ucsd.edu/news_uploads/_social/AI-powered-tech-teaser.jpg"
          alt="AI Innovation"
          className="w-full max-w-lg lg:max-w-3xl rounded-3xl shadow-xl transform hover:scale-105 transition duration-500"
        />
      </div>
    </div>
  );
};

export default HomePage;
