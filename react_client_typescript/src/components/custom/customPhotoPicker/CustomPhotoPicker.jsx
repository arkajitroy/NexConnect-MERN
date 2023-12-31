import React from "react";
import { createPortal } from "react-dom";

const CustomPhotoPicker = ({ onChange }) => {
  const component = (
    <input type="file" hidden id="photo-picker" onChange={onChange} />
  );
  return createPortal(
    component,
    document.getElementById("photo-picker-element")
  );
};

export default CustomPhotoPicker;
