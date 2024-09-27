import PropTypes from "prop-types";

const RepoCommits = ({
  connectedRepo,
  commits,
  selectedRepoName,
  handleStartCodeReview,
}) => {
  return (
    <>
      {connectedRepo && commits.length > 0 ? (
        <div className="mt-6 max-h-screen overflow-y-auto border-t pt-4 scrollbar">
          <h3 className="text-xl font-semibold mb-2">
            Commits for {selectedRepoName}
          </h3>
          <ul className="space-y-4">
            {commits.map((commit, index) => (
              <li key={index} className="border-b pb-4">
                <p className="font-medium">{commit.commit.message}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Author: {commit.commit.author.name} - Date:{" "}
                  {new Date(commit.commit.author.date).toLocaleString()}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <a
                    href={commit.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 underline hover:text-purple-700 flex items-center"
                  >
                    View on GitHub
                  </a>
                  <button
                    onClick={() => handleStartCodeReview(commit.sha)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Start Code Review
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : connectedRepo ? (
        <p>No commits found for this repository.</p>
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
