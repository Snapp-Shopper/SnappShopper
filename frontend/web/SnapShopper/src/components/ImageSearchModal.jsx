import React, { useRef } from 'react';
import { BsCardImage } from 'react-icons/bs';

const ImageSearchModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);

  // Close modal when clicking outside
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-2xl shadow-xl"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Find Product with Image Search</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Drag and drop area */}
          <div className="bg-gray-50 p-8 rounded-lg mb-6 flex flex-col items-center justify-center border-2 border-dashed border-blue-300 hover:border-blue-500 transition-colors">
            <div className="text-blue-500 mb-4">
              <BsCardImage className="h-10 w-10" />
            </div>
            <p className="text-lg text-gray-700 mb-2">Drag and Drop an Image or 
              <span className="text-blue-600 font-medium underline ml-1 cursor-pointer"
                onClick={handleUploadClick} >
                 Upload a File
              </span>
            </p>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={(e) => console.log(e.target.files[0])} // Handle file change
              className="hidden" // Hide the file input
            />
          </div>

          {/* URL input */}
          <div className="flex">
            <input
              type="text"
              placeholder="Paste a link to an image here"
              className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSearchModal;