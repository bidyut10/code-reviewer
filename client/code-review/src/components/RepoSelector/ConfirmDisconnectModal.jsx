import PropTypes from "prop-types";

const ConfirmDisconnectModal = ({ confirmDisconnectRepo }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Disconnect Repository</h3>
        <p>Are you sure you want to disconnect the repo?</p>
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => confirmDisconnectRepo(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Confirm
          </button>
          <button
            onClick={() => confirmDisconnectRepo(false)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
