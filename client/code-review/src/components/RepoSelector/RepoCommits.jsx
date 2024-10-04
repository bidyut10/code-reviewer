import PropTypes from "prop-types";
import "../../App.css";
import { FaRegUser } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
const RepoCommits = ({
  connectedRepo,
  commits,
  selectedRepoName,
  handleStartCodeReview,
}) => {
  return (
    <>
      {connectedRepo && commits.length > 0 ? (
        <div className="mt-2 max-h-[470px] overflow-y-auto pt-2 scrollbar">
          <h3 className="text-2xl mb-5">
            Commits for{" "}
            <span className="text-gray-700">{selectedRepoName}</span>
          </h3>
          <ul className="space-y-2 pr-2">
            {commits.map((commit, index) => (
              <li
                key={index}
                className="border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out hover:border-[#aeea60] bg-white"
              >
                <p className="text-lg">{commit.commit.message}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <FaRegUser className="text-sm text-gray-400" />
                    <span>{commit.commit.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CiCalendarDate className="text-lg text-gray-400" />
                    <span>
                      {new Date(commit.commit.author.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-4">
                  <a
                    href={commit.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-3xl bg-[#c1ff72]"
                  >
                    View on Github
                  </a>
                  <button
                    onClick={() =>
                      handleStartCodeReview(selectedRepoName, commit.sha)
                    }
                    className="px-4 py-2 rounded-3xl bg-gray-950 text-white"
                  >
                    Code Review
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : connectedRepo ? (
        <p className="text-gray-900">No commits found for this repository.</p>
      ) : null}
    </>
  );
};

RepoCommits.propTypes = {
  connectedRepo: PropTypes.bool.isRequired,
  commits: PropTypes.array.isRequired,
  selectedRepoName: PropTypes.string,
  handleStartCodeReview: PropTypes.func.isRequired,
};

export default RepoCommits;
