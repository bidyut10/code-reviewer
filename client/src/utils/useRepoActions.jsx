import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const useRepoActions = () => {
  const [commits, setCommits] = useState([]);
  const [connectedRepo, setConnectedRepo] = useState(null); // Null by default
  const navigate = useNavigate(); // Add useNavigate for redirection

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
        const reviewResponse = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/github/repos/${selectedRepo}/commits/${commitSha}`,
          { withCredentials: true }
        );

        // Redirect to /response and pass the review data via state
        navigate("/response", { state: { review: reviewResponse.data } });
      } catch (error) {
        console.error("Failed to fetch code review", error);
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
    setConnectedRepo,
    handleConnectRepo,
    handleStartCodeReview,
    handleDisconnectRepo,
    confirmDisconnectRepo,
  };
};

export default useRepoActions;
