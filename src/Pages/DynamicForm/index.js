import React, { useState } from "react";
import SectionComponent from "./sections"
import { useDispatch, useSelector } from "react-redux";
import { addSectionTitle, insertSection } from "../../Store/dynamicForm/slice";
import { useHistory } from "react-router-dom";
import { customSnackBar } from "../../utils";
import SideNavone from "../../SideNavBar";

const CreateSection = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedSection = useSelector(
    (state) => state.DynamicForm.selectedSection
  );
  const [section, setSection] = useState(
    selectedSection || {
      containers: [],
    }
  );

  const onSaveHandler = (event) => {
    event.preventDefault();
    const { sectionTitle, containers } = selectedSection;
    if (!sectionTitle.trim()) {
      customSnackBar("Section title cannot be empty");
      return;
    }
    if (containers.length === 0) {
      customSnackBar("At least one container is required");
      return;
    }
    if (containers.some((container) => container.fields.length === 0)) {
      customSnackBar("Each container must have at least one field");
      return;
    }
    dispatch(insertSection());
    history.replace("/preview-page");
  };

  const sectionTitleChangeHandler = (e) => {
    dispatch(addSectionTitle(e.target.value));
    setSection((prevSection) => ({
      ...prevSection,
      sectionTitle: e.target.value,
    }));
  };

  return (
    <SideNavone>
      <form className="dynamic_formContainer">
        <div className="d-flex justify-content-between align-items-center">
          <div
            className="pt-2"
            onClick={() => history.replace("/preview-page")}
            role="button"
          >
            <i id="icon_left_color" className="fas fa-chevron-left"></i>
          </div>
          <p className="dynamic_heading">Please add fields in dynamic form</p>
        </div>
        <div className="mb-4">
          <SectionComponent
            isPreview={false}
            section={section}
            sectionTitle={section.sectionTitle}
            sectionTitleChange={sectionTitleChangeHandler}
          />
        </div>
        <div className="d-flex justify-content-end mt-4">
          {/* <button className="dynamic_borderButton px-4 me-4" onClick={addSectionHandler}>Add Section</button> */}
          <button className="dynamic_blueButton px-5" onClick={onSaveHandler}>
            Save Section
          </button>
        </div>
      </form>
    </SideNavone>
  );
};

export default CreateSection;

// setSection((prevForm) => ({
//   ...prevForm,
//   containers: [
//     ...prevForm.containers,
//     {
//       id: `${sessionId}.${section.containers.length + 1}`,
//       containerTitle: "title",
//       containerType: "",
//       containerDirection: "horizontal",
//       contentAdjustment: "equalSpacing",
//       fields: [],
//     },
//   ],
// }));

// const createField = (sessionId, containerId) => {
//   setSection((prevForm) => ({
//     ...prevForm,
//     containers: prevForm.containers.map((field) =>
//       field.id === containerId
//         ? {
//             ...field,
//             fields: [
//               ...field.fields,
//               {
//                 id: parseFloat(`${containerId}.${field.fields.length + 1}`),
//                 fieldLabel: "singleSelectDropDown",
//                 title: "gender",
//                 columnName: "gender",
//                 isRequired: true,
//                 answer: "male",
//                 minLimit: 4,
//                 maxLimit: 30,
//                 position: 0,
//                 options: [
//                   {
//                     optionId: 1,
//                     optionName: "male",
//                   },
//                   {
//                     optionId: 2,
//                     optionName: "female",
//                   },
//                 ],
//                 allowsMultipleSelection: false,
//                 errorMessage: "Select your gender",
//                 regex: ".*[^A-Za-z ].*",
//               },
//             ],
//           }
//         : field
//     ),
//   }));
// };
