import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";

const CodeReviewResponse = () => {
  const location = useLocation();
  const review = location.state?.review; // Access the review data
  const [formattedReviews, setFormattedReviews] = useState([]);
  const navigate = useNavigate();

  const goBackFunc = () => {
    navigate("/home");
  };
  // Clean the review text by removing *, **, and # and formatting it
  useEffect(() => {
    if (review?.reviews) {
      const cleanedReviews = review.reviews.map((item) => {
        return {
          fileName: item.fileName,
          review: cleanReviewText(item.review),
        };
      });
      setFormattedReviews(cleanedReviews);
    }
  }, [review]);

  // Function to clean the markdown symbols from the review text
  const cleanReviewText = (text) => {
    return text
      .replace(/[#*]+/g, "") // Remove # and * symbols
      .replace(/`/g, "") // Remove backticks
      .replace(/- /g, "• "); // Replace hyphens with bullet points
  };

  return (
    <div className="w-auto bg-white px-10 lg:px-40 pt-20 pb-10">
      <button
        className="text-xl mb-20 flex justify-center items-center"
        onClick={goBackFunc}
      >
        <ChevronLeft className="mr-2 size-4" strokeWidth={1.5} />
        <h2>Go Back</h2>
      </button>
      {formattedReviews.length ? (
        <div className="w-full">
          <h2 className="text-3xl mb-8">Code Review</h2>
          {formattedReviews.map((item, index) => (
            <div key={index} className="rounded-lg p- mb-6">
              <h3 className="text-xl font-normal text-blue-600 mb-4">
                {item.fileName}
              </h3>
              <pre className="whitespace-pre-wrap text-gray-700 text-lg leading-relaxed">
                {item.review}
              </pre>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-xl">
          No review data available.
        </p>
      )}
    </div>
  );
};

export default CodeReviewResponse;
