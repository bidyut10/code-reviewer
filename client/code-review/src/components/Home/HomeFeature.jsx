import ai from "../../assets/features/ai.png";
import code from "../../assets/features/code.png";
import review from "../../assets/features/review.png";
import time from "../../assets/features/time.png";

const HomeFeature = () => {
  const cardStyles =
    "relative flex flex-col md:flex-row items-center rounded-xl shadow-lg hover:shadow-xl bg-white h-auto md:h-56 overflow-hidden mb-6";
  const contentStyles = "p-6 flex-1 text-center md:text-left";
  const imageContainerStyles =
    "w-full md:w-auto h-[300px] md:h-full overflow-hidden";
  const imageStyles =
    "w-full h-full object-cover transition-transform duration-300 hover:scale-110";

  return (
    <div className="w-full md:w-[900px] px-[10px] md:px-[0px] my-40">
      {/* Title and Summary */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl uppercase">Features</h1>
        <div className="w-full h-6 ml-4 bg-black"></div>
      </div>
      <div className="mb-6">
        <p className="text-xl text-start mt-4 mb-12">
          Discover how our AI-powered tools can transform your development
          process. From performing detailed automated code reviews to providing
          insightful suggestions, these tools enhance your workflow at every
          stage.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="gap-4">
        {/* Card 1 */}
        <div className={cardStyles}>
          <div className={imageContainerStyles}>
            <img
              src={review}
              alt="Automated Code Review"
              className={imageStyles}
            />
          </div>
          <div className={contentStyles}>
            <h3 className="text-3xl mb-4">Automated Code Review</h3>
            <p className="text-xl">
              Use AI to catch potential bugs and optimize your code
              automatically. Focus on writing high-quality code while our tool
              handles the tedious reviews for you.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className={cardStyles}>
          <div className={imageContainerStyles}>
            <img
              src={time}
              alt="Save Time & Boost Productivity"
              className={imageStyles}
            />
          </div>
          <div className={contentStyles}>
            <h3 className="text-3xl mb-4">Save Time & Boost Productivity</h3>
            <p className="text-xl">
              Spend more time building and less time debugging. Our AI helps you
              streamline the development process by automating repetitive tasks.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className={cardStyles}>
          <div className={imageContainerStyles}>
            <img
              src={code}
              alt="Enhance Code Quality"
              className={imageStyles}
            />
          </div>
          <div className={contentStyles}>
            <h3 className="text-3xl mb-4">Enhance Code Quality</h3>
            <p className="text-xl">
              Ensure that your code meets industry standards with the help of
              our AI’s objective and comprehensive feedback. Quality is
              guaranteed.
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className={cardStyles}>
          <div className={imageContainerStyles}>
            <img
              src={ai}
              alt="AI-Powered Suggestions"
              className={imageStyles}
            />
          </div>
          <div className={contentStyles}>
            <h3 className="text-3xl mb-4">AI-Powered Suggestions</h3>
            <p className="text-xl">
              Receive real-time AI suggestions to improve your code and learn
              best practices, helping you grow as a developer with each project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFeature;
