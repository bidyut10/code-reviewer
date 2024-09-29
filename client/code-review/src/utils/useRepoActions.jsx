import { useState } from "react";
import axios from "axios";

const useRepoActions = () => {
  const [commits, setCommits] = useState([]);
  const [connectedRepo, setConnectedRepo] = useState(null); // Null by default

  const handleConnectRepo = async (selectedRepo) => {
    if (selectedRepo) {
      try {
        const commitsResponse = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/github/repos/${selectedRepo}/commits`,
          { withCredentials: true }
        );
        setCommits(commitsResponse.data || []); // Store commits
        setConnectedRepo(selectedRepo); // Set the connected repo
      } catch (error) {
        console.error("Failed to fetch commits", error);
      }
    }
  };

  const handleStartCodeReview = async (selectedRepo, commitSha) => {
    if (selectedRepo && commitSha) {
      try {
        const filesResponse = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/github/repos/${selectedRepo}/commits/${commitSha}`,
          { withCredentials: true }
        );
        console.log("Changed files:", filesResponse.data.files);
      } catch (error) {
        console.error("Failed to fetch changed files", error);
      }
    }
  };

  const handleDisconnectRepo = () => {
    setConnectedRepo(null); // Clear the connected repo
    setCommits([]); // Clear commits after disconnect
  };

  const confirmDisconnectRepo = (confirm) => {
    if (confirm) {
      handleDisconnectRepo(); // Handle disconnect if confirmed
    }
  };

  return {
    commits,
    connectedRepo,
    setConnectedRepo, // Added this to allow setting from other components
    handleConnectRepo,
    handleStartCodeReview,
    handleDisconnectRepo,
    confirmDisconnectRepo,
  };
};

export default useRepoActions;
