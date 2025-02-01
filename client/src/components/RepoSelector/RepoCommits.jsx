import PropTypes from "prop-types";
import "../../App.css";
import { Calendar, Github, Sparkle, User } from "lucide-react";
const RepoCommits = ({
  connectedRepo,
  commits,
  selectedRepoName,
  handleStartCodeReview,
  
}) => {
  return (
    <>
      {connectedRepo && commits.length > 0 ? (
        <div className="mt-2 max-h-[570px] overflow-y-auto pt-2 scrollbar">
          <h3 className="text-2xl mb-5">
            Commits for{" "}
            <span className="text-gray-700">{selectedRepoName}</span>
          </h3>
          <ul className="space-y-2 pr-2">
            {commits.map((commit, index) => (
              <li
                key={index}
                className="border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out hover:border-purple-400 bg-white"
              >
                <p className="text-lg">{commit.commit.message}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <User className="text-sm text-gray-400" strokeWidth={1.5} />
                    <span>{commit.commit.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar
                      className="text-lg text-gray-400"
                      strokeWidth={1.5}
                    />
                    <span>
                      {new Date(commit.commit.author.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row mt-4 md:mt-0 items-center justify-end gap-4">
                  <a
                    href={commit.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 pl-4 pr-3 py-[6px] rounded-3xl font-normal hover:bg-purple-500 bg-purple-400 text-black -colors duration-1000 ease-in-out w-full md:w-auto"
                  >
                    <span>View on Github</span>
                    <Github className="hover:animate-pulse" strokeWidth={1.5} />
                  </a>
                  <button
                    onClick={() =>
                      handleStartCodeReview(selectedRepoName, commit.sha)
                    }
                    className="flex items-center gap-2 pl-4 pr-3 py-[6px] rounded-3xl font-normal bg-[#1e1d1d] text-white hover:bg-[#000000] duration-1000 ease-in-out w-full md:w-auto group"
                  >
                    <span>Code Review</span>
                    <Sparkle
                      className="group-hover:animate-pulse"
                      strokeWidth={1.5}
                    />
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
