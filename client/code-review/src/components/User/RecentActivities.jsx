import PropTypes from "prop-types";

const RecentActivities = ({ events }) => {
  return (
    <div className="timeline">
      <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
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
  );
};

// Prop validation
RecentActivities.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      repo: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RecentActivities;
