import PropTypes from "prop-types";

const ConfirmDisconnectModal = ({ confirmDisconnectRepo }) => {
  return (
    <div className="fixed inset-0 top-0 z-50 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
      <div className="bg-white px-6 py-16 rounded-lg shadow-xl max-w-md w-full transform scale-95 transition-transform duration-300">
        <h3 className="text-2xl font-normal text-gray-800 mb-6 text-center">
          Disconnect Repository
        </h3>
        <p className="mb-6 text-center text-xl">
          Are you sure you want to disconnect the repository?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => confirmDisconnectRepo(true)}
            className="bg-[#1e1d1d] text-white px-8 py-2 rounded-lg text-xl hover:bg-black shadow-md transition-colors duration-200"
          >
            Confirm
          </button>
          <button
            onClick={() => confirmDisconnectRepo(false)}
            className="hover:bg-purple-400 bg-purple-300 text-black px-8 py-2 rounded-lg text-xl shadow-md transition-colors duration-200"
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
