import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import RepoDropdown from "./RepoDropdown";
import RepoCommits from "./RepoCommits";
import ConfirmDisconnectModal from "./ConfirmDisconnectModal";
import "../../App.css";
import useRepoActions from "../../utils/useRepoActions";
import useGitHubData from "../../utils/useGitHubData";
import FullScreenLoader from "../FullScreenLoader";

const RepoSelector = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dropdownRef = useRef(null);
  const {
    commits,
    connectedRepo,
    setConnectedRepo, // Add this to manage the repo state directly
    handleConnectRepo,
    handleStartCodeReview,
    confirmDisconnectRepo,
    loading
  } = useRepoActions();
  const { repos } = useGitHubData();
  const [selectedRepo, setSelectedRepo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const clearSelection = () => {
    setSelectedRepo(""); // Reset selectedRepo properly
    setSearchTerm("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        clearSelection();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRepoConnect = () => {
    handleConnectRepo(selectedRepo).then(() => {
      setConnectedRepo(selectedRepo); // Set the selected repo as connected repo
      clearSelection(); // Clear selection after connecting
    });
  };

  const handleRepoDisconnect = () => {
    confirmDisconnectRepo(true); // Confirm and handle disconnect
    setConnectedRepo(null); // Clear the connected repo
    setSelectedRepo(""); // Clear the selected repo
  };

  return (
    <div className="repo-selector w-full md:w-[700px]" ref={dropdownRef}>
      <FullScreenLoader loading={loading} />
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
            onClick={handleRepoConnect}
            className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-black w-full mb-2"
          >
            Connect Repository
          </button>
        )
      ) : (
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setModalVisible(true)}
            className="font-normal hover:bg-[#a7ff33] bg-[#c1ff72] text-black -colors duration-1000 ease-in-out px-4 py-2 rounded flex-1"
          >
            Disconnect Repository
          </button>
        </div>
      )}

      {/* Display Commits for the Connected Repo */}
      {connectedRepo && (
        <RepoCommits
          connectedRepo={connectedRepo}
          commits={commits}
          selectedRepoName={connectedRepo} // Show connected repo name
          handleStartCodeReview={handleStartCodeReview}
        />
      )}

      {/* Modal for Disconnect Confirmation */}
      {modalVisible && (
        <ConfirmDisconnectModal
          confirmDisconnectRepo={(confirm) => {
            if (confirm) {
              handleRepoDisconnect(); // Disconnect and clear state
            }
            setModalVisible(false); // Hide the modal
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
  connectedRepo: PropTypes.string,
  handleDisconnectRepo: PropTypes.func.isRequired,
  commits: PropTypes.array.isRequired,
  selectedRepoName: PropTypes.string,
  handleStartCodeReview: PropTypes.func,
};

export default RepoSelector;
