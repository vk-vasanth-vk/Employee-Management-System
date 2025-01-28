import React from "react";

const LabelWithInput = ({ label, type, value, onChange, placeholder, maxLength, accept, disabled, options, dept }) => {
  if (type === "select") {
    return (
      <>
        <label>{label}</label>
        <select
          className="border border-gray-400 p-2 ml-4 w-[400px]"
          value={value}
          onChange={onChange}
          disabled={disabled}
          title={disabled ? "Select the Department" : ""}
        >
          <option value="">{placeholder}</option>
          {options &&
            options
              .filter((opt) => !dept || opt.dept === dept)
              .map((opt, index) => (
                <option value={opt.role} key={index}>
                  {opt.role}
                </option>
              ))}
        </select>
      </>
    );
  }

  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        accept={accept}
        className="border border-gray-400 p-2 ml-4 w-[400px]"
      />
    </>
  );
};

export default LabelWithInput;