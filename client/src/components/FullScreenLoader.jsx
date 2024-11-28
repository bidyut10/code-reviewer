import PropTypes from "prop-types";
import logo from "../assets/c.png";

const FullScreenLoader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <img
          src={logo}
          alt="Loading..."
          className="h-20 md:32 animate-pulse"
        />
    </div>
  );
};

FullScreenLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default FullScreenLoader;
