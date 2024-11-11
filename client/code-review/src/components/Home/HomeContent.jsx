import c from "../../assets/vf.jpg";
import image1 from "../../assets/users/image1.jpg";
import image2 from "../../assets/users/image2.jpg";
import image3 from "../../assets/users/image3.jpg";
import image4 from "../../assets/users/image4.jpg";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";

const HomeContent = () => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  };
  return (
    <div className="w-full md:w-[900px] px-[10px] md:px-[0px]">
      <div className="flex flex-col md:flex-row justify-between items-end py-4 gap-10">
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <p className="text-3xl">
            codewise.<span className="text-[#c1ff72] tenor">ai</span>
          </p>
          <div className="text-xl mt-2 mb-16">
            Boost your coding efficiency with instant AI-powered insights that
            refine your code quality seamlessly with every GitHub commit.
          </div>
          <IoIosArrowRoundForward size={80} className="text-[#c1ff72]" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-end">
          <div className="flex flex-row justify-center md:justify-end">
            <div className="relative flex flex-row items-center">
              <img
                src={image3}
                alt="User 1"
                className="w-10 h-10 rounded-full shadow-lg"
                style={{ zIndex: 4, marginLeft: 0 }}
              />
              <img
                src={image1}
                alt="User 2"
                className="w-10 h-10 rounded-full shadow-lg"
                style={{ zIndex: 3, marginLeft: "-10px" }}
              />
              <img
                src={image4}
                alt="User 3"
                className="w-10 h-10 rounded-full shadow-lg"
                style={{ zIndex: 2, marginLeft: "-10px" }}
              />
              <img
                src={image2}
                alt="User 4"
                className="w-10 h-10 rounded-full shadow-lg"
                style={{ zIndex: 1, marginLeft: "-10px" }}
              />
            </div>
          </div>
          <p className="text-xl mt-4 text-center md:text-right">
            100+ users currently improving their code
          </p>
          <button
            className="bg-black text-white w-full md:w-auto rounded-full px-10 py-3 text-xl mt-4 flex justify-center items-center"
            onClick={handleLogin}
          >
            <h2>Try It Now</h2>
            <MdArrowOutward className="ml-1 size-6" />
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start py-4 gap-10">
        <div className="bg-[#c1ff72] w-full md:w-1/3 rounded-xl p-8 flex flex-col justify-between h-[330px]">
          <p className="text-3xl mb-4">
            Efficient <br /> Code Review
          </p>
          <p className="text-xl mb-4">
            Get AI-powered suggestions and improve the efficiency of your code
            reviews.
          </p>
          <button className="bg-black text-white rounded-full px-8 py-3 text-xl mt-auto shadow-md">
            Learn More
          </button>
        </div>

        <div className="w-full md:w-2/3">
          <img
            src={c}
            alt="Code Review Visual"
            className="rounded-xl shadow-lg h-[330px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
