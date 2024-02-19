import React, { useState, useEffect } from "react";
import FieldsComponent from "./field";
import axios from "axios";
import "./dynamicForm.css";
import SideNavone from "../../SideNavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  addFields,
  changeIsRequiredField,
  removeFields,
} from "../../Store/dynamicForm/slice";
import { useHistory } from "react-router-dom";
import { customSnackBar } from "../../utils";

const FieldsForm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [columnNames, setColumnNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedField, setSearchedField] = useState("");
  const containerPosition = useSelector(
    (state) => state.DynamicForm.selectedContainerPosition
  );
  const sections = useSelector((state) => state.DynamicForm.form.sections);
  const selectedSection = useSelector(
    (state) => state.DynamicForm.selectedSection
  );
  const selectedContainer = selectedSection.containers?.find(
    (item) => item.position === containerPosition
  );
  const [fields, setFields] = useState(selectedContainer || { fields: [] });
  const genderOptions = [
    {
      optionId: 1,
      optionName: "male",
    },
    {
      optionId: 2,
      optionName: "female",
    },
    {
      optionId: 3,
      optionName: "others",
    },
  ];

  const countryOptions = [
    {
      optionId: 1,
      optionName: "Pakistan",
    },
    {
      optionId: 2,
      optionName: "United Kingdom",
    },
    {
      optionId: 3,
      optionName: "United States",
    },
  ];
  useEffect(() => {
    const fetchField = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/customer_svc/pv/columnnames/getAllAvailableColumnNames`
      );
      if (response.data.code === 0) {
        const transformedFields = response.data.result.columnNames.map(
          (item, index) => {
            // const isRequired =
            // sections.some((section) =>
            //   section.containers?.some((container) =>
            //     container.fields?.some(
            //       (field) => field.columnName === item.columnName && field.isRequired
            //     )
            //   )
            // );
            return {
              id: item.id,
              fieldLabel: "singleSelectDropDown",
              fieldType: item.status,
              title: item.columnName,
              columnName: item.columnName,
              isRequired: true,
              answer: item.status === "int" ? "0" : "",
              minLimit: 4,
              maxLimit: 30,
              position: item.position,
              options:
                item.columnName === "gender"
                  ? genderOptions
                  : item.columnName === "country"
                  ? countryOptions
                  : [],
              allowsMultipleSelection: false,
              errorMessage: `Select your ${item.columnName}`,
              regex: item.status === "string" ? ".*[^A-Za-z ].*" : "undefined",
            };
          }
        );
        setColumnNames(transformedFields);
      }
      setIsLoading(false);
    };
    fetchField();
  }, [sections]);

  const createField = (field) => {
    const fieldsLength = fields.fields?.length;
    const fieldExists = fields?.fields?.some(
      (f) => f.columnName === field.columnName
    );
    if (!fieldExists) {
      if (fieldsLength < 4) {
        field.position = fieldsLength;
        dispatch(addFields(field));
        setFields((prevField) => ({
          ...prevField,
          fields: [...prevField.fields, field],
        }));
      } else {
        customSnackBar("Maximum number of fields reached");
      }
    } else {
      removeFieldHandler(field);
    }
    setSearchedField("");
  };

  const removeFieldHandler = (field) => {
    dispatch(removeFields(field.columnName));
    setFields((prevField) => ({
      ...prevField,
      fields: prevField.fields.filter((i) => i.columnName !== field.columnName),
    }));
  };

  const changeIsRequiredFieldHandler = (field) => {
    const data = {
      isRequired: !field.isRequired,
      fieldPosition: field.position,
    };
    dispatch(changeIsRequiredField(data));
    setFields((prevFields) => ({
      ...prevFields,
      fields: prevFields?.fields?.map((f) =>
        f.columnName === field.columnName
          ? { ...f, isRequired: !f.isRequired }
          : f
      ),
    }));
    setColumnNames((prevColumn) => {
      const updatedColumns = prevColumn.map((col) =>
        col.columnName === field.columnName
          ? { ...col, isRequired: !col.isRequired }
          : col
      );
      return updatedColumns;
    });
  };

  const searchedInputHandler = (e) => {
    e.preventDefault();
    setSearchedField(e.target.value);
  };

  const saveAndContinueHanlder = () => {
    if (selectedContainer.fields.length < 1) {
      customSnackBar("Fields must be selected at least 1");
    } else {
      history.replace("/dynamic-form");
    }
  };

  const isFieldChecked = (item) => {
    const isFieldInGlobalFields = fields?.fields?.some(
      (field) => field.columnName === item.columnName
    );
    return isFieldInGlobalFields;
  };

  return (
    <SideNavone>
      {isLoading ? (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center ">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="dynamic_formContainer">
          <p className="dynamic_heading">Please select fields</p>
          <div className="dynamic_selectedFields mb-4">
            <div className="w-100 mb-2 d-flex align-items-center">
              {fields?.fields?.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    fields?.fields?.length === 1
                      ? "w-100"
                      : fields?.fields?.length === 2
                      ? index === 1
                        ? "w-50"
                        : "w-50 me-4"
                      : fields?.fields?.length === 3
                      ? index === 2
                        ? "widthThirtyThree"
                        : "widthThirtyThree me-3"
                      : index === 3
                      ? "w-25"
                      : "w-25 me-2"
                  }`}
                  role="button"
                >
                  <FieldsComponent
                    // key={item.columnName}
                    isSelecting={true}
                    field={item}
                    removeField={removeFieldHandler}
                  />
                </div>
              ))}
            </div>
            <input
              value={searchedField}
              onChange={searchedInputHandler}
              className="w-100 dynamic_fieldSearchInput"
            />
            {searchedField !== "" &&
              columnNames
                .filter((item) =>
                  item.columnName
                    .toLowerCase()
                    .includes(searchedField.toLowerCase())
                )
                .map(
                  (item, index, arr) =>
                    !sections?.some(
                      (section) =>
                        section.position !== selectedSection.position &&
                        section.containers?.some((container) =>
                          container.fields?.some(
                            (field) => field.columnName === item.columnName
                          )
                        )
                    ) &&
                    !selectedSection.containers.some(
                      (container) =>
                        container.position !== containerPosition &&
                        container.fields.some(
                          (field) => field.columnName === item.columnName
                        )
                    ) && (
                      <div key={index}>
                        {index !== 0 && <div className="dynamic_divider" />}
                        <div
                          className="dynamic_fieldSearchedValues"
                          onClick={() => createField(item)}
                        >
                          {item.columnName}
                        </div>
                      </div>
                    )
                )}
          </div>
          {columnNames.map(
            (item, index) =>
              !sections?.some(
                (section) =>
                  section.position !== selectedSection.position &&
                  section.containers?.some((container) =>
                    container.fields?.some(
                      (field) => field.columnName === item.columnName
                    )
                  )
              ) &&
              !selectedSection.containers.some(
                (container) =>
                  container.position !== containerPosition &&
                  container.fields.some(
                    (field) => field.columnName === item.columnName
                  )
              ) && (
                <div
                  key={index}
                  className={`dynamic_fieldList ${
                    fields?.fields?.some(
                      (field) => field.columnName === item.columnName
                    ) && "dynamic_isCheckedFieldList"
                  }`}
                >
                  <div>
                    {item.title}
                    <span className="dynamic_fieldType">
                      {" "}
                      ({item.fieldType})
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <span>Required</span>
                    <div className="d-flex align-items-center">
                      <label className="dynamic_switch">
                        <input
                          type="checkbox"
                          onChange={() => changeIsRequiredFieldHandler(item)}
                          checked={item.isRequired}
                        />
                        <span className="dynamic_slider dynamic_round"></span>
                      </label>
                    </div>
                    <label className="dynamic_checkbox">
                      <input
                        type="checkbox"
                        onChange={() => createField(item)}
                        checked={isFieldChecked(item)}
                      />
                      <span className="dynamic_checkmark"></span>
                    </label>
                  </div>
                </div>
              )
          )}
          <div className="d-flex justify-content-end">
            <button
              className="dynamic_blueButton"
              onClick={saveAndContinueHanlder}
            >
              Save & Continue
            </button>
          </div>
        </div>
      )}
    </SideNavone>
  );
};

export default FieldsForm;

//<div className="w-50 me-3">
//<FieldsComponent
//  isSelecting={true}
//  field={{
//    title: "First Name",
//  }}
///>
//</div>
//<div className="w-50 ms-3">
//<FieldsComponent
//  isSelecting={true}
//  field={{
//    title: "Last Name",
//  }}
///>
//</div>

//const createField = (field) => {
//  const fieldExists = fields.fields.some(
//    (f) => f.columnName === field.columnName
//  );
//  setFields((prevField) => {
//    if (fieldExists) {
//      return {
//        ...prevField,
//        fields: prevField.fields.filter(
//          (f) => f.columnName !== field.columnName
//        ),
//      };
//    } else {
//      if (prevField.fields.length < 4) {
//        return {
//          ...prevField,
//          fields: [...prevField.fields, field],
//        };
//      } else {
//        console.warn("Maximum number of fields reached");
//        return prevField;
//      }
//    }
//  });
//}
