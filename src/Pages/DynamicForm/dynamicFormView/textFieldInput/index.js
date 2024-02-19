import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "../../viewPage.css";

const TextField = ({
  label = "Label",
  placeholder = "nothing passed",
  type = "text",
  onHandleChange,
  value,
  name,
  className,
  classNameParent,
  error = false,
  disabled,
  helperText,
  showPasswordIcon = false,
  minDate,
  maxDate,
  isRequired
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [previousFieldEmpty, setPreviousFieldEmpty] = useState(false);

  const handlerFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false)
    setPreviousFieldEmpty(!value || (Array.isArray(value) && value.length === 0));
  };
  const toggleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

    useEffect(()=>{
      setPreviousFieldEmpty(false);
    },[value]);

    const isFieldEmpty = !value || (Array.isArray(value) && value.length === 0);

  return (
    <div
      className={`dynamicform_textFieldDiv d-flex flex-column justify-content-center ${
        isFocused ? "dynamicform_inputFocused" : ""
      } ${isRequired && isFieldEmpty && previousFieldEmpty && !isFocused ? "dynamicform_inputError" : ""} ${classNameParent}`}
    >
      <div
        className={`dynamicform_label ${
          isFocused ? "dynamicform_labelFocused" : ""
        }`}
      >
        {label} <span className={isRequired ? "dynamicform_requiredAsterisk" : "d-none"}>*</span>
      </div>
      <input
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        name={name}
        className={`dynamicform_input ${className}`}
        disabled={disabled}
        onChange={onHandleChange}
        value={value}
        onFocus={handlerFocus}
        onBlur={handleBlur}
        min={type === "date" && minDate ? minDate : undefined}
        max={type === "date" && maxDate ? maxDate : undefined}
      />
      {type === "password" && showPasswordIcon && (
        <button
          type="button"
          className="dynamicform_showPasswordButton"
          onClick={toggleShowPassword}
        >
          <IconContext.Provider value={{ size: "1.2em", color: "gray" }}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </IconContext.Provider>
        </button>
      )}
      {error ? <p className="dynamicform_errorMessage">{helperText}</p> : null}
    </div>
  );
};
export default TextField;
