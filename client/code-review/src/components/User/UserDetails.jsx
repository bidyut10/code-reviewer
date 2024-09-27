import UserProfile from "./UserProfile";
import RecentRepositories from "./RecentRepositories";
import RecentActivities from "./RecentActivities";
import PropTypes from "prop-types";

const UserDetails = ({ user, events, repos }) => {
  return (
    <div className="mb-">
      {user ? <UserProfile user={user} /> : <p>Loading user profile...</p>}
      <RecentRepositories repos={repos} />
      <RecentActivities events={events} />
    </div>
  );
};

// Prop validation
UserDetails.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string,
    login: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
  }),
  events: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      repo: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserDetails;
