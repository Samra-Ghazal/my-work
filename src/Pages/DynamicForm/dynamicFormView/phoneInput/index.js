import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";

const CustomPhoneInput = ({
  disabled,
  title,
  isRequired,
  value,
  onChange,
  classNameParent,
  action
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [previousFieldEmpty, setPreviousFieldEmpty] = useState(false);
  const handlerFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    setPreviousFieldEmpty(
      !value || (Array.isArray(value) && value.length === 0)
    );
  };
  useEffect(() => {
    setPreviousFieldEmpty(false);
  }, [value]);
  const isFieldEmpty = !value || (Array.isArray(value) && value.length === 0);
  return (
    <div
      className={`d-flex flex-column dynamicform_phoneinput ${
        isFocused ? "dynamicform_inputFocused" : ""
      } ${
        isRequired && isFieldEmpty && previousFieldEmpty && !isFocused
          ? "dynamicform_inputError"
          : ""
      } ${classNameParent}`}
    >
      <span
        className={`dynamicform_label ${action==="customer"?"ms-3 mt-3":"ms-2"} mb-0 ${
          isFocused ? "dynamicform_labelFocused" : ""
        }`}
      >
        {title}{" "}
        <span
          className={isRequired ? "dynamicform_requiredAsterisk" : "d-none"}
        >
          *
        </span>
      </span>
      <PhoneInput
      // disabled={}
        defaultMask="........."
        // renderStringAsFlag={" "}
        //  inputStyle={{color:'green'}}
        //  containerStyle={{backgroundColor:"#000"}}
        buttonStyle={{ borderRight: "1px solid #DCDCDC" }}
        specialLabel=""
        //  dropdownStyle={{height:'22px'}}
        inputStyle={{
          width: "95%",
          height:"20px",
          color: " #616161",
          border: "none",
          borderRadius: "8px",
          paddingLeft: "75px",
        }}
        // disableDropdown={true}
        showDropdown={false}
        country={"gb"}
        inputProps={{
          onFocus: (e) => {
            handlerFocus();
            // e.target.style.backgroundColor = "white";
          },
          onBlur: (e) => {
            handleBlur();
            // e.target.style.backgroundColor = "";
          },
        }}
        value={value}
        onChange={onChange}
        placeholder="4423221321"
        // className="phone-input"
      />
    </div>
  );
};

export default CustomPhoneInput;
