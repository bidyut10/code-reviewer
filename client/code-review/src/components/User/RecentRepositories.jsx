import { IoLogoGithub } from "react-icons/io"; // GitHub Icons
import PropTypes from "prop-types";

const RecentRepositories = ({ repos }) => {
  const sortedRepos = repos.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Recent Repositories</h2>
      <ul className="space-y-2 mb-12">
        {sortedRepos.slice(0, 3).map((repo) => (
          <li key={repo.id} className="flex justify-between items-center">
            <div className="flex items-center">
              <IoLogoGithub className="text-gray-600 mr-2" />
              <span className="">{repo.name}</span>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(repo.created_at).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Prop validation
RecentRepositories.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RecentRepositories;
