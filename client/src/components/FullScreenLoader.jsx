import PropTypes from "prop-types";
import logo from "../assets/cwl.png";

const FullScreenLoader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <img
          src={logo}
          alt="Loading..."
          className="w-20 md:w-32 animate-pulse"
        />
    </div>
  );
};

FullScreenLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default FullScreenLoader;
