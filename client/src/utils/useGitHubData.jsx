import { useEffect, useState } from "react";
import axios from "axios";

const useGitHubData = () => {
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const reposResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/github/repos`,
          { withCredentials: true }
        );
        setRepos(reposResponse.data.repos);
        setEvents(reposResponse.data.events.slice(0, 5)); // Show last 5 events

        const userProfile = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/github/user`,
          { withCredentials: true }
        );
        setUser(userProfile.data);
      } catch (error) {
        console.error("Failed to fetch GitHub data", error);
      }
    };

    fetchGitHubData();
  }, []);

  return { repos, events, user };
};

export default useGitHubData;
