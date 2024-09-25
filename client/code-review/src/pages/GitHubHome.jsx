import React, { useEffect, useState } from "react";
import axios from "axios";

const GitHubHome = () => {
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null); // State for storing user data

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch repositories and events
        const response = await axios.get(
          "http://localhost:3000/api/github/repos",
          {
            withCredentials: true,
          }
        );
        setRepos(response.data.repos);
        setEvents(response.data.events);

        // Fetch user profile data
        const userProfile = await axios.get(
          "http://localhost:3000/api/github/user",
          {
            withCredentials: true,
          }
        );
        setUser(userProfile.data); // Set the user profile data
      } catch (error) {
        console.error("Failed to fetch GitHub data", error);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        GitHub Repositories and Events
      </h1>

      {/* Repositories Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Repositories</h2>
        {repos.length > 0 ? (
          <ul className="space-y-4">
            {repos.map((repo) => (
              <li key={repo.id} className="p-4 bg-white rounded shadow">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {repo.name}
                </a>
                <p>{repo.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No repositories found.</p>
        )}
      </div>

      {/* Events Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Events</h2>
        {events.length > 0 ? (
          <ul className="space-y-4">
            {events.map((event, index) => (
              <li key={index} className="p-4 bg-white rounded shadow">
                <p>
                  <strong>{event.type}</strong> in{" "}
                  <a
                    href={event.repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {event.repo.name}
                  </a>
                </p>
                <p>Created at: {new Date(event.created_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found.</p>
        )}
      </div>

      {/* User Profile Section */}
      {user && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
          <div className="p-6 bg-white rounded shadow">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-gray-500">@{user.login}</p>
                <p className="text-gray-600">{user.bio}</p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View GitHub Profile
                </a>
              </div>
            </div>
            <div className="mt-4">
              <p>
                <strong>Public Repos:</strong> {user.public_repos}
              </p>
              <p>
                <strong>Followers:</strong> {user.followers}
              </p>
              <p>
                <strong>Following:</strong> {user.following}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubHome;
