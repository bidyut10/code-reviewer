import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import RepoDropdown from "./RepoDropdown";
import RepoCommits from "./RepoCommits";
import ConfirmDisconnectModal from "./ConfirmDisconnectModal";
import "../../App.css";

const RepoSelector = ({
  repos,
  searchTerm,
  setSearchTerm,
  selectedRepo,
  setSelectedRepo,
  handleConnectRepo,
  connectedRepo,
  handleDisconnectRepo,
  commits,
  selectedRepoName,
  handleStartCodeReview,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dropdownRef = useRef(null);

  const clearSelection = () => {
    setSelectedRepo(null); // Clear the selected repository
    setSearchTerm(""); // Clear the search term
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Hide the dropdown if clicked outside
        clearSelection();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="repo-selector w-[600px]" ref={dropdownRef}>
      <h2 className="text-2xl font-semibold mb-4 uppercase">
        Select a Repository
      </h2>

      <RepoDropdown
        repos={repos}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRepo={selectedRepo}
        setSelectedRepo={setSelectedRepo}
        clearSelection={clearSelection}
      />

      {/* Connect/Disconnect Repo Buttons */}
      {!connectedRepo ? (
        selectedRepo && (
          <button
            onClick={() => {
              handleConnectRepo();
              clearSelection(); // Clear selection on connect
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full mb-2"
          >
            Connect Repo
          </button>
        )
      ) : (
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setModalVisible(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex-1"
          >
            Disconnect Repo
          </button>
        </div>
      )}

      {/* Display Commits for the Connected Repo */}
      <RepoCommits
        connectedRepo={connectedRepo}
        commits={commits}
        selectedRepoName={selectedRepoName}
        handleStartCodeReview={handleStartCodeReview}
      />

      {/* Modal for Disconnect Confirmation */}
      {modalVisible && (
        <ConfirmDisconnectModal
          confirmDisconnectRepo={(confirm) => {
            if (confirm) {
              handleDisconnectRepo(); // Clear commit section on disconnect
              clearSelection(); // Clear the selection as well
            }
            setModalVisible(false);
          }}
        />
      )}
    </div>
  );
};

RepoSelector.propTypes = {
  repos: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  selectedRepo: PropTypes.string,
  setSelectedRepo: PropTypes.func.isRequired,
  handleConnectRepo: PropTypes.func.isRequired,
  connectedRepo: PropTypes.bool.isRequired,
  handleDisconnectRepo: PropTypes.func.isRequired,
  commits: PropTypes.array.isRequired,
  selectedRepoName: PropTypes.string,
  handleStartCodeReview: PropTypes.func.isRequired,
};

export default RepoSelector;
