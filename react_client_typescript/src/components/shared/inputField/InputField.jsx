import React from "react";

const InputField = ({ name, state, setState, label = false }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    setState(value);
  };

  return (
    <div className="flex gap-1 flex-col">
      {label && (
        <label htmlFor={name} className="text-teal-light text-lg-px-1">
          {name}
        </label>
      )}
      <div>
        <input
          type="text"
          className="bg-input-background text-start focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
          name={name}
          value={state}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default InputField;
