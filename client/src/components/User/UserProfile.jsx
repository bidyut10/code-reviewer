import PropTypes from "prop-types";

const UserProfile = ({ user }) => {
  return (
    <div className="flex space-x-4 mb-8">
      <img
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        className="w-16 h-16 rounded-2xl border-2 border-gray-50"
      />
      <div>
        <h3 className="text-lg font-normal uppercase">{user.name}</h3>
        <p className="text-gray-500 mt-1 text-sm">{user.bio}</p>
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
