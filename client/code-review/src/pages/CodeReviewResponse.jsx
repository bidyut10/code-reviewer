import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const CodeReviewResponse = () => {
  const location = useLocation();
  const review = location.state?.review; // Access the review data
  const [formattedReviews, setFormattedReviews] = useState([]);

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
    <div className=" min-h-screen">
      <Navbar />
      <div className="mt-10 px-10 lg:px-40 py-10">
        {formattedReviews.length ? (
          <div>
            <h2 className="text-3xl mb-8">
              Code Review
            </h2>
            {formattedReviews.map((item, index) => (
              <div
                key={index}
                className="rounded-lg p- mb-6"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-4">
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
    </div>
  );
};

export default CodeReviewResponse;
