import PropTypes from "prop-types";

const ConfirmDisconnectModal = ({ confirmDisconnectRepo }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
      <div className="bg-white px-6 py-16 rounded-lg shadow-xl max-w-md w-full transform scale-95 transition-transform duration-300">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Disconnect Repository
        </h3>
        <p className="text-gray-600 mb-6 text-center">
          Are you sure you want to disconnect the repository? This action cannot
          be undone.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => confirmDisconnectRepo(true)}
            className="bg-gray-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-gray-700 shadow-md transition-colors duration-200"
          >
            Confirm
          </button>
          <button
            onClick={() => confirmDisconnectRepo(false)}
            className="bg-red-500 text-white px-8 py-2 rounded-lg font-medium hover:bg-red-600 shadow-md transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmDisconnectModal.propTypes = {
  confirmDisconnectRepo: PropTypes.func.isRequired,
};

export default ConfirmDisconnectModal;
