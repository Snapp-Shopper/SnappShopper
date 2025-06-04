import React, { useState } from "react";
import { FiCamera } from "react-icons/fi";
import ImageSearchModal from "../ImageSearchModal";
import { useModal } from "../../utils/ModalUtils";

const HeroBanner = () => {
  const imageSearchModal = useModal();

  return (
    <>
      <div className="bg-zinc-900 text-white py-12 p-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center md:text-left mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
              Shop Smarter ~ Find What
              <br />
              You Need with Just a Snap
            </h1>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="relative">
              <div className="flex items-center bg-white rounded-full p-2">
                <div className="flex-shrink-0 pl-2 pr-3">
                  <FiCamera
                    className="h-6 w-6 text-zinc-400 mr-2 cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={imageSearchModal.openModal}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Upload image or Enter product, categories..."
                  className="flex-grow text-black outline-none py-2"
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full md:w-auto sm:w-auto">
                  Search
                </button>
              </div>
            </div>
            <p className="text-center text-zinc-400 mt-2 text-sm">
              Upload an image to find your desired product instantly!
            </p>
          </div>
        </div>
      </div>

      {/* Image Search Modal */}
      <ImageSearchModal
        isOpen={imageSearchModal.isOpen}
        onClose={imageSearchModal.closeModal}
      />
    </>
  );
};

export default HeroBanner;
