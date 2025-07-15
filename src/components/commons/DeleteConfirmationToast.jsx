import React from "react";
const DeleteConfirmationToast = ({ onConfirm, closeToast }) => (
  <div>
    <p className="font-semibold mb-2">Are you sure?</p>
    <p className="text-sm mb-4">
      This will permanently delete your account and all data.
    </p>
    <div className="flex justify-end space-x-3">
      <button
        onClick={closeToast}
        className="bg-gray-600 hover:bg-gray-500 text-white text-xs font-bold py-1 px-3 rounded"
      >
        Cancel
      </button>
      <button
        onClick={() => {
          onConfirm();
          closeToast();
        }}
        className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-1 px-3 rounded"
      >
        Yes, Delete
      </button>
    </div>
  </div>
);
export default DeleteConfirmationToast;
