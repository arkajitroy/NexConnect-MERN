import React, { useCallback, useEffect, useRef } from "react";

const CustomContextMenuDialog = ({
  options,
  cordinates,
  contextMenu,
  setContextMenu,
}) => {
  const contextMenuRef = useRef(null);

  const handleClick = (event, callback) => {
    event.stopPropagation();
    setContextMenu();
    callback();
  };

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (event.target.id !== "context-opener") {
        if (
          contextMenuRef.current &&
          !contextMenuRef.current.contains(event.target)
        ) {
          setContextMenu(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, []);

  return (
    <div
      className={`bg-dropdown-background fixed py-4 z-[100] shadow-xl`}
      ref={contextMenuRef}
      style={{
        top: cordinates.y,
        left: cordinates.x,
      }}
    >
      <ul>
        {options.map((item, index) => {
          const { name, callback } = item;
          return (
            <li
              key={index}
              className="px-5 py-2 cursor-pointer hover:bg-background-default-hover"
              onClick={(event) => handleClick(event, callback)}
            >
              <span className="text-white">{name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CustomContextMenuDialog;
