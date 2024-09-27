import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDetails from "./UserDetails";
import RepoSelector from "./RepoSelector";

const GitHubHome = () => {
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [connectedRepo, setConnectedRepo] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [showConfirmation, setShowConfirmation] = useState(false); // For disconnect confirmation
  const [commits, setCommits] = useState([]); // Store commits for selected repo

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch repositories, events, and user profile
        const reposResponse = await axios.get(
          "http://localhost:3000/api/github/repos",
          { withCredentials: true }
        );
        setRepos(reposResponse.data.repos);
        setEvents(reposResponse.data.events.slice(0, 5)); // Show last 5 events

        const userProfile = await axios.get(
          "http://localhost:3000/api/github/user",
          { withCredentials: true }
        );
        setUser(userProfile.data);
      } catch (error) {
        console.error("Failed to fetch GitHub data", error);
      }
    };

    fetchGitHubData();
  }, []);

  // Handle connecting to the selected repo
  const handleConnectRepo = async () => {
    if (selectedRepo) {
      try {
        const commitsResponse = await axios.get(
          `http://localhost:3000/api/github/repos/${selectedRepo}/commits`,
          { withCredentials: true }
        );
        console.log(commitsResponse.data); // Check the response
        setCommits(commitsResponse.data || []); // Ensure commits is an array
        setConnectedRepo(true);
      } catch (error) {
        console.error("Failed to fetch commits", error);
      }
    }
  };

  const handleDisconnectRepo = () => {
    setShowConfirmation(true);
  };

  const confirmDisconnectRepo = (confirm) => {
    if (confirm) {
      setConnectedRepo(false);
      setSelectedRepo("");
      setCommits([]); // Clear commits when disconnecting
    }
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen gap-20 p-10 flex mt-20">
      {/* Display User Details and Recent Events */}
      <UserDetails user={user} events={events} repos={repos} />

      {/* Select Repository */}
      <RepoSelector
        repos={repos}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRepo={selectedRepo}
        setSelectedRepo={setSelectedRepo}
        handleConnectRepo={handleConnectRepo}
        connectedRepo={connectedRepo}
        handleDisconnectRepo={handleDisconnectRepo}
        showConfirmation={showConfirmation}
        confirmDisconnectRepo={confirmDisconnectRepo}
        commits={commits}
        selectedRepoName={selectedRepo}
      />
    </div>
  );
};

export default GitHubHome;
