import React from "react";

const FieldsComponent = (props) => {
  return (
    <div
      className={`dynamic_field ${
        props.isSelecting && "d-flex justify-content-between align-items-center"
      }`}
    >
      <span>{props.field.title}</span>
      {props.isSelecting && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          onClick={()=>props.removeField(props.field)}
          role="button"
        >
          <g clipPath="url(#clip0_12454_17606)">
            <path
              d="M7.00033 12.8337C10.222 12.8337 12.8337 10.222 12.8337 7.00033C12.8337 3.77866 10.222 1.16699 7.00033 1.16699C3.77866 1.16699 1.16699 3.77866 1.16699 7.00033C1.16699 10.222 3.77866 12.8337 7.00033 12.8337Z"
              stroke="#D1CECE"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.66699 7H9.33366"
              stroke="#D1CECE"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_12454_17606">
              <rect width="14" height="14" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
    </div>
  );
};

export default FieldsComponent;
