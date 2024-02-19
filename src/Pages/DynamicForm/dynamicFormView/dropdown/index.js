import React, { useState } from "react";
import "../../viewPage.css";

const CustomDropdown = ({
  id = "nothing Entered",
  options,
  value,
  onChange,
  disabled,
  labelKey,
  valueKey,
  className,
  isRequired,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handlerFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  return (
    <>
      <div
        className={`dynamicform_textFieldDiv ${
          isFocused ? "dynamicform_inputFocused" : ""
        } ${className}`}
        role="button"
      >
        <div
          className="dropdown d-flex text-primary justify-content-between align-items-center"
          onClick={
            disabled
              ? null
              : (e) => {
                  e.preventDefault();
                  setShowDropDown(!showDropDown);
                }
          }
          onFocus={handlerFocus}
          onBlur={handleBlur}
        >
          <div className="d-flex flex-column">
            <div
              className={`dynamicform_label ${
                isFocused ? "dynamicform_labelFocused" : ""
              }`}
            >
              {id}{" "}
              <span
                className={
                  isRequired ? "dynamicform_requiredAsterisk" : "d-none"
                }
              >
                *
              </span>
            </div>
            <div className="dynamicform_input">{value} </div>
          </div>
          <div className="d-flex justify-content-between align-items-center text-dark ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="6"
              viewBox="0 0 9 6"
              fill="none"
            >
              <path
                d="M1 1L4.75 4.75L8.5 1"
                stroke="#AAAAAA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <ul
          className={`dropdown-menu ${
            showDropDown ? "d-block" : ""
          } position-absolute p-2 mt-1 overflow-auto bg-white`}
          style={{
            maxHeight: "25vh",
            top: "52px",
            left: "0",
            width: "100%",
          }}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className={`dropdown-item ${
                option.optionName === value && "bg-warning"
              }`}
              onClick={() => {
                onChange(option.optionName);
                setShowDropDown(false);
              }}
            >
              {option.optionName}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CustomDropdown;
