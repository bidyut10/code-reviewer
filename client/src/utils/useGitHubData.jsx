import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useGitHubData = () => {
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true);
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
        navigate("/");
        console.error("Failed to fetch GitHub data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return { repos, events, user, loading };
};

export default useGitHubData;
