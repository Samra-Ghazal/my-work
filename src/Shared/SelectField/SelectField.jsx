import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import Text from "../Text";
import "./style.scss";

export default function SelectField(props) {
  const {
    options,
    placeholder,
    isSearchable,
    values,
    name,
    defaultValue,
    handleChange,
    SelectFormDiv,
    helpertext,
    error,
    className,
    isMulti,
  } = props;

  return (
    <div className={`inputFormDiv ${SelectFormDiv}`}>
      <Select
        isMulti={isMulti}
        name={name}
        defaultValue={defaultValue}
        className={`selectFieldDesign ${className}`}
        options={options}
        value={values}
        placeholder={placeholder}
        // noDataRenderer={() => <p>No data</p>}
        isSearchable={isSearchable}
        onChange={handleChange}
        // defaultMenuIsOpen={true}
      />
      {error ? <Text className="errorMessage">{helpertext}</Text> : null}
    </div>
  );
}
SelectField.defaultProps = {
  options: ["select"],
  placeholder: "select..",
  name: "",
  className: "",
  SelectFormDiv: "",
  helpertext: "",
  isSearchable: false,
  error: true,
  values: [],
  defaultValue: null,
  isMulti: false,
  handleChange: () => {},
};
SelectField.propTypes = {
  options: PropTypes.array,
  values: PropTypes.array,
  placeholder: PropTypes.string,
  SelectFormDiv: PropTypes.string,
  helpertext: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  isSearchable: PropTypes.bool,
  error: PropTypes.bool,
  isMulti: PropTypes.bool,
  handleChange: PropTypes.func,
};
