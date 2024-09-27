import { useState } from "react";
import axios from "axios";

const useRepoActions = () => {
  const [commits, setCommits] = useState([]);
  const [connectedRepo, setConnectedRepo] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConnectRepo = async (selectedRepo) => {
    if (selectedRepo) {
      try {
        const commitsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/github/repos/${selectedRepo}/commits`,
          { withCredentials: true }
        );
        setCommits(commitsResponse.data || []);
        setConnectedRepo(true);
      } catch (error) {
        console.error("Failed to fetch commits", error);
      }
    }
  };

  const handleStartCodeReview = async (selectedRepo, commitSha) => {
    if (selectedRepo && commitSha) {
      try {
        const filesResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/github/repos/${selectedRepo}/commits/${commitSha}`,
          { withCredentials: true }
        );
        console.log("Changed files:", filesResponse.data.files);
      } catch (error) {
        console.error("Failed to fetch changed files", error);
      }
    }
  };

  const handleDisconnectRepo = () => {
    setShowConfirmation(true);
  };

  const confirmDisconnectRepo = (confirm) => {
    if (confirm) {
      setConnectedRepo(false);
      setCommits([]);
    }
    setShowConfirmation(false);
  };

  return {
    commits,
    connectedRepo,
    showConfirmation,
    handleConnectRepo,
    handleStartCodeReview,
    handleDisconnectRepo,
    confirmDisconnectRepo,
  };
};

export default useRepoActions;
