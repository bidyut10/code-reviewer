import { IoLogoGithub } from "react-icons/io"; // GitHub Icons

const UserDetails = ({ user, events, repos }) => {
  // Sort repositories by creation date
  const sortedRepos = repos.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div className="mb-">
      {/* User Profile */}
      {user ? (
        <div className="flex items-center space-x-4 mb-8">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-16 h-16 rounded-full border-4 border-gray-50"
          />
          <div>
            <h3 className="text-2xl font-semibold">{user.name}</h3>
            <p className="text-gray-500 mt-2">{user.bio}</p>
          </div>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}

      {/* Latest Repositories */}
      <h2 className="text-lg font-semibold mb-2">Recent Repositories</h2>
      <ul className="space-y-2 mb-12">
        {sortedRepos.slice(0, 3).map((repo) => (
          <li key={repo.id} className="flex justify-between items-center">
            <div className="flex items-center">
              <IoLogoGithub className="text-gray-700 mr-2" />
              <span className="font-medium">{repo.name}</span>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(repo.created_at).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>

      {/* Latest Events Timeline */}
      <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
      <div className="timeline">
        {events.length > 0 ? (
          <ul className="space-y-4">
            {events.map((event, index) => (
              <li
                key={index}
                className="relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-gray-300"
              >
                <div className="ml-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <p className="font-medium">{event.type}</p>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className="text-sm text-gray-600">{event.repo.name}</p>
                    <p className="text-sm text-gray-600 text-end">
                      {new Date(event.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent events found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
