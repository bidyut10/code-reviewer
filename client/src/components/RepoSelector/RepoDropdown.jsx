import { useEffect, useState } from "react";
import {Search, X } from "lucide-react";
import PropTypes from "prop-types";

const RepoDropdown = ({
  repos,
  searchTerm,
  setSearchTerm,
  selectedRepo,
  setSelectedRepo,
  clearSelection,
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRepoSelect = (repo) => {
    setSelectedRepo(repo.name); // Set the selected repository name
    setSearchTerm(repo.name); // Update the search term to the selected repo name
    setIsOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // Toggle dropdown visibility
  };

  // Close dropdown on outside click
  const handleClickOutside = (event) => {
    const dropdown = document.getElementById("repo-dropdown");
    if (dropdown && !dropdown.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Add event listener on mount and remove on unmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mb-4" id="repo-dropdown">
      <div className="flex items-center border border-gray-950 rounded relative">
        <Search className="ml-4" strokeWidth={1.5} />
        <input
          type="text"
          placeholder="Search or select a repository..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onFocus={toggleDropdown} // Open dropdown when focused
          className="border-0 p-2 rounded-l w-full focus:outline-none"
        />
        {selectedRepo && (
          <X
            className=" cursor-pointer mr-2"
            onClick={clearSelection}
            strokeWidth={1.5}
          />
        )}
      </div>

      {/* Custom Dropdown */}
      {isOpen && filteredRepos.length > 0 && (
        <ul className="dropdown-list absolute w-full bg-white rounded-b max-h-60 overflow-y-auto z-10 scrollbar">
          {filteredRepos.map((repo) => (
            <li
              key={repo.id}
              onClick={() => handleRepoSelect(repo)}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
            >
              {repo.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

RepoDropdown.propTypes = {
  repos: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  selectedRepo: PropTypes.string,
  setSelectedRepo: PropTypes.func.isRequired,
  clearSelection: PropTypes.func.isRequired,
};

export default RepoDropdown;
