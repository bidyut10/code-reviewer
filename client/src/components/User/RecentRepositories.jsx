import PropTypes from "prop-types";
import { Github } from "lucide-react";

const RecentRepositories = ({ repos }) => {
  const sortedRepos = repos.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div>
      <h2 className="text-lg font-normal mb-2">Recent Repositories</h2>
      <ul className="space-y-2 mb-12">
        {sortedRepos.slice(0, 3).map((repo) => (
          <li key={repo.id} className="flex justify-between items-center">
            <div className="flex items-center">
              <Github
                className="text-gray-600 mr-2"
                size={14}
                strokeWidth={1.3}
              />
              <span className="text-sm">{repo.name}</span>
            </div>
            <span className="text-xs text-gray-500">
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
