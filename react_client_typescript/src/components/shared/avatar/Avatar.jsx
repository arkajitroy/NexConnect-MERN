import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import {
  CustomCaptureMenu,
  CustomContextMenuDialog,
  CustomPhotoLibraryPicker,
  CustomPhotoPicker,
} from "@/components";
import { DefaultDP } from "@/assets";

const Avatar = ({ type, image, setImage }) => {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);

  const showContextMenu = (event) => {
    event.preventDefault();
    setContextMenuCordinates({ x: event.pageX, y: event.pageY });
    setIsContextMenuVisible(true);
  };

  const contextMenuOptions = [
    { name: "Take Photo", callback: () => setShowCapturePhoto(true) },
    // { name: "Choose From Library", callback: () => setShowPhotoLibrary(true) },
    { name: "Upload Photo", callback: () => setGrabPhoto(true) },
    { name: "Remove Photo", callback: () => setImage(DefaultDP) },
  ];

  const handleChangePhotoPicker = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const data = document.createElement("img");

    reader.onload = function (event) {
      const result = event.target.result;
      data.src = result;
      data.setAttribute("data-src", result);
    };

    reader.readAsDataURL(file);

    setTimeout(() => {
      setImage(data.src);
    }, 100);
  };

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (event) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      };
    }
  }, [grabPhoto]);
  return (
    <>
      <div className="flex items-center justify-center">
        {type === "sm" && (
          <div className="relative h-10 w-10">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "lg" && (
          <div className="relative h-14 w-14">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "xl" && (
          <div
            className="relative cursor-pointer z-0"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={`z-10 bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2 ${
                hover ? "visible" : "hidden"
              }`}
              onClick={(event) => showContextMenu(event)}
              id="context-opener"
            >
              <FaCamera
                className="text-xl  text-white"
                id="context-opener"
                onClick={(event) => showContextMenu(event)}
              />
              <span
                id="context-opener"
                onClick={(event) => showContextMenu(event)}
              >
                Change Profile Photo
              </span>
            </div>

            <div className="flex items-start justify-center h-60 w-60">
              <Image src={image} alt="avatar" className="rounded-full" fill />
            </div>
          </div>
        )}
      </div>
      {showCapturePhoto && (
        <CustomCaptureMenu setImage={setImage} hide={setShowCapturePhoto} />
      )}
      {isContextMenuVisible && (
        <CustomContextMenuDialog
          options={contextMenuOptions}
          cordinates={contextMenuCordinates}
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
        />
      )}
      {showPhotoLibrary && (
        <CustomPhotoLibraryPicker
          setImage={setImage}
          hidePhotoLibrary={setShowPhotoLibrary}
        />
      )}
      {grabPhoto && <CustomPhotoPicker onChange={handleChangePhotoPicker} />}
    </>
  );
};

export default Avatar;
