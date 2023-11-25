import React, { useState } from "react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import { CustomContextMenuDialog } from "@/components";

const Avatar = ({ type, image, setImage }) => {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });
  const showContextMenu = (event) => {
    event.preventDefault();
    setContextMenuCordinates({ x: event.pageX, y: event.pageY });
    setIsContextMenuVisible(true);
  };

  const contextMenuOptions = [
    { name: "Take Photo", callback: () => {} },
    { name: "Choose From Library", callback: () => {} },
    { name: "Upload Photo", callback: () => {} },
    { name: "Remove Photo", callback: () => {} },
  ];

  console.log("on hover state", hover);
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
      {isContextMenuVisible ? (
        <CustomContextMenuDialog
          options={contextMenuOptions}
          cordinates={contextMenuCordinates}
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Avatar;
