import React from "react";
import { IoClose } from "react-icons/io5";

import { DummyUserImage } from "@/assets";
import Image from "next/image";

const CustomPhotoLibraryPicker = ({ setImage, hidePhotoLibrary }) => {
  const images = [DummyUserImage];

  return (
    <div className="fixed top-0 left-0 max-h-[100vh] max-w[100vw] h-full w-full flex justify-center items-center">
      <div className="h-max w-max bg-gray-900 gap-6 rounded-lg p-4">
        <div className="pt-2 pe-2 cursor-pointer flex items-end justify-end">
          <IoClose
            className="h-10 w-10 cursor-pointer"
            onClick={() => hidePhotoLibrary(false)}
          />
        </div>
        <div className="grid grid-cols-3 justify-center items-center gap-16 p-20 w-full">
          {images.map((image, index) => (
            <div
              onClick={() => {
                setImage(image[index]);
                hidePhotoLibrary(false);
              }}
            >
              <div className="h-24 w-24 cursor-pointer relative rounded-full">
                <Image src={image} alt="avatar" fill />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomPhotoLibraryPicker;
