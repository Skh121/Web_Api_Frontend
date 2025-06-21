import React from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

const FileUpload = ({ label, name, onFileChange, onRemove, imagePreview, error }) => {
  return (
    <div>
      {/* The main label passed from the parent */}
      <label className="block text-sm font-medium text-gray-400 mb-2">
        {label}
      </label>

      {/* --- Conditional Display --- */}
      {imagePreview ? (
        // --- VIEW WHEN IMAGE IS SELECTED ---
        <div className="relative w-full h-48 rounded-lg border border-gray-600">
          <img
            src={imagePreview}
            alt="Chart Preview"
            className="h-full w-full object-contain rounded-lg"
          />
          <button
            type="button"
            onClick={onRemove} // <-- Handler to remove the image
            className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1.5 text-white hover:bg-opacity-75"
            aria-label="Remove image"
          >
            <FaTimes />
          </button>
        </div>
      ) : (
        // --- DEFAULT VIEW (YOUR ORIGINAL DESIGN) ---
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10 hover:border-gray-500 transition-colors">
          <div className="text-center">
            <FaCloudUploadAlt
              className="mx-auto h-12 w-12 text-gray-500"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm justify-center leading-6 text-gray-400">
              <label
                htmlFor={name} // Use the name prop for the 'for' attribute
                className="relative cursor-pointer rounded-md font-semibold text-blue-500 hover:text-blue-400"
              >
                <span>Upload a file</span>
                <input
                  id={name} // Use the name prop for the id
                  name={name} // Use the name prop for the name
                  type="file"
                  className="sr-only"
                  onChange={onFileChange} // <-- CRUCIAL: Attach the onChange handler
                  accept="image/png, image/jpeg, image/gif"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      )}

      {/* Display Validation Error */}
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default FileUpload;