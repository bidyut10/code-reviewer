import PropTypes from "prop-types";

const UserProfile = ({ user }) => {
  return (
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
  );
};

// Prop validation
UserProfile.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    name: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
};

export default UserProfile;
