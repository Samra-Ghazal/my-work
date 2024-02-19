import React, { useState } from "react";
import "./dynamicForm.css";
import ContainerComponent from "./container";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addContainer,
  addContainerAtPosition,
  deleteSection,
  selectedSectionChange,
} from "../../Store/dynamicForm/slice";

const SectionComponent = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedSection, setSelectedSection] = useState(false);

  const navigateToCustomerDynamicFields = () => {
    dispatch(addContainer(props.section.position));
    history.replace("/customer-dynamic-fields");
  };

  const editSectionHandler = () => {
    dispatch(selectedSectionChange(props.section));
    history.replace("/dynamic-form");
  };

  const addContainerInPosition = async (item) => {
    try {
      await dispatch(addContainerAtPosition(item.position));
      setTimeout(history.replace("/customer-dynamic-fields", 2000));
      // history.push('/customer-dynamic-fields');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeSectionHandler = () => {
    dispatch(deleteSection(props.section.position));
    setSelectedSection(false);
  };

  return (
    <div className="dynamic_section">
      {props.isPreview === true ? (
        <div className="dynamic_sectionHeader">
          <div>{props.section.sectionTitle}</div>
          {props.isViewing !== true && props.index !== 0 && <div
            className="d-flex flex-column justify-content-evenly align-items-center"
            role="button"
            onClick={() => setSelectedSection(!selectedSection)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="3"
              height="3"
              viewBox="0 0 3 3"
              fill="none"
            >
              <circle cx="1.25" cy="1.25" r="1.25" fill="#424242" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="3"
              height="3"
              viewBox="0 0 3 3"
              fill="none"
            >
              <circle cx="1.25" cy="1.25" r="1.25" fill="#424242" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="3"
              height="3"
              viewBox="0 0 3 3"
              fill="none"
            >
              <circle cx="1.25" cy="1.25" r="1.25" fill="#424242" />
            </svg>
          </div>}
          {selectedSection && (
            <div className="dynamic_sectionHeaderMoreOption">
              <div role="button" className="px-3 py-1" onClick={editSectionHandler}>
                <span>Edit</span>
              </div>
              <hr className="m-0 p-0 mx-1" />
              <div role="button" className="px-3 py-1" onClick={removeSectionHandler}>
                <span>Remove</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="dynamic_sectionHeader">
          <input
            value={props.sectionTitle}
            onChange={props.sectionTitleChange}
            placeholder="Enter Section Name"
          />
        </div>
      )}
      <div className="dynamic_sectionContent">
        {props.section.containers.map((item, index) => (
          <div key={index}>
            <ContainerComponent
              isPreview={props.isPreview}
              container={item}
              section={props.section}
            />
            {props.isPreview !== true &&
              props.section.containers.length - 1 !== index && (
                <div
                  className="dynamic_createContainerLine p-0 m-0 d-flex align-items-center"
                  onClick={() => addContainerInPosition(item)}
                >
                  <hr className="dynamic_containerDivider dynamic_leftOneDivider  p-0 m-0" />
                  <div className="mx-2 my-1 dynamic_containerPlus">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2.5 6H9.5"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 2.5V9.5"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>{" "}
                  <hr className="dynamic_containerDivider dynamic_rightOneDivider p-0 m-0" />
                </div>
              )}
          </div>
        ))}
        {props.isPreview !== true && (
          <div
            className="dynamic_createContainer mt-2"
            onClick={navigateToCustomerDynamicFields}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2.5 6H9.5"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 2.5V9.5"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionComponent;
