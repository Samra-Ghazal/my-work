import React from "react";
import { useHistory } from "react-router-dom";
import "./dynamicForm.css";
import FieldsComponent from "./field";
import { useDispatch } from "react-redux";
import {
  selectedContainerChange,
} from "../../Store/dynamicForm/slice";

const ContainerComponent = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const navigateToCustomerDynamicFields = () => {
    console.log(props.container);
      dispatch(selectedContainerChange(props.container.position));
      history.replace("/customer-dynamic-fields");
  };

  return (
    <div className={`dynamic_container ${props.isPreview === true && "dynamic_isPreviewing"}`}>
      {props.isPreview !== true && props.container.fields.length < 4 && (
        <div
          className="dynamic_plusButton"
          role="button"
          onClick={navigateToCustomerDynamicFields}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M3.11133 7H10.8891"
              stroke="#5599FF"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.00098 3.11035V10.8881"
              stroke="#5599FF"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
      <div className="w-100 d-flex align-items-center">
        {props.container.fields.map((item, index) => (
          <div
            className={`${
              props.container.fields.length === 1
                ? "w-100"
                : props.container.fields.length === 2
                ? index === 1
                  ? "w-50"
                  : "w-50 me-2"
                : props.container.fields.length === 3
                ? index === 2
                  ? "widthThirtyThree"
                  : "widthThirtyThree me-2"
                : index === 3
                ? "w-25"
                : "w-25 me-2"
            } mb-1 marginRightSixPx`}
            key={index}
          >
            <FieldsComponent
              isSelecting={false}
              field={item}
              fieldsLength={props.container.fields.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContainerComponent;
