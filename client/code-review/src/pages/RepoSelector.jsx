import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io"; // Close icon for clearing the selected repo
import { FaGithub } from "react-icons/fa"; // GitHub icon
import "../App.css"; // Importing the CSS file

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
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  // Filter repositories based on search term
  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRepoSelect = (repo) => {
    setSelectedRepo(repo.name); // Set the selected repository name
    setSearchTerm(repo.name); // Update the search term to the selected repo name
    setDropdownVisible(false); // Hide the dropdown after selection
  };

  const clearSelection = () => {
    setSelectedRepo(null); // Clear the selected repository
    setSearchTerm(""); // Clear the search term
    setDropdownVisible(false); // Hide the dropdown
  };

  const confirmDisconnectRepo = (confirm) => {
    if (confirm) {
      handleDisconnectRepo();
    }
    setModalVisible(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="repo-selector w-[600px]">
      <h2 className="text-2xl font-semibold mb-4 uppercase">
        Select a Repository
      </h2>

      {/* Unified Searchable Dropdown for Repositories */}
      <div className="relative mb-4" ref={dropdownRef}>
        <div className="flex items-center border rounded relative">
          <FiSearch className="ml-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search or select a repository..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setDropdownVisible(true); // Show dropdown when typing
            }}
            onFocus={() => setDropdownVisible(true)} // Show dropdown when the input is focused
            className="border-0 p-2 rounded-l w-full focus:outline-none"
          />
          {selectedRepo && (
            <IoMdClose
              className="text-gray-500 cursor-pointer mr-2"
              onClick={clearSelection}
            />
          )}
        </div>

        {/* Custom Dropdown */}
        {dropdownVisible && filteredRepos.length > 0 && (
          <ul className="dropdown-list absolute w-full bg-white border border-gray-300 rounded-b max-h-60 overflow-y-auto z-10 scrollbar">
            {filteredRepos.map((repo) => (
              <li
                key={repo.id}
                onClick={() => handleRepoSelect(repo)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {repo.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Connect/Disconnect Repo Buttons */}
      {!connectedRepo ? (
        selectedRepo && (
          <button
            onClick={handleConnectRepo}
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
                    {/* <FaGithub className="mr-1" /> */}
                     View on GitHub
                  </a>
                  <button
                    onClick={() => {
                      /* Start code review functionality */
                    }}
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

      {/* Modal for Disconnect Confirmation */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Disconnect Repository
            </h3>
            <p>Are you sure you want to disconnect the repo?</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => confirmDisconnectRepo(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setModalVisible(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepoSelector;
