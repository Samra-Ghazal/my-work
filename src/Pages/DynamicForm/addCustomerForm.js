import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageInput from "./dynamicFormView/imageInput";
import "./viewPage.css";
import TextField from "./dynamicFormView/textFieldInput";
import DropDown from "./dynamicFormView/dropdown";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  setIsLoadingFalse,
  setIsLoadingTrue,
} from "../../Store/dynamicForm/slice";
import { customSnackBar } from "../../utils";
import CustomPhoneInput from "./dynamicFormView/phoneInput";

const AddCustomerForm = ({
  isModal = false,
  handleFormSubmission,
  filterFirstName,
  filterLastName,
  filterEmail,
  filterContactNumber,
  handleSelectedCustomer,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.DynamicForm.form);
  const isLoading = useSelector((state) => state.DynamicForm.isLoading);
  const userID = useSelector(
    (state) => state.Auth.userloginsuccessyasir.users.id
  );
  const selectedBusinessId = useSelector(
    (state) => state.DynamicForm.selectedBusiness
  );
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (formState?.sections) {
      const initialData = formState.sections.reduce((acc, section) => {
        if (section.containers) {
          section.containers.forEach((container) => {
            if (container.fields) {
              container.fields.forEach((field) => {
                let columnValue;
                switch (field.columnName) {
                  case "customerFirstName":
                    columnValue = filterFirstName || "";
                    break;
                  case "customerLastName":
                    columnValue = filterLastName || "";
                    break;
                  case "primaryEmail":
                    columnValue = filterEmail || "";
                    break;
                  case "primaryMobile":
                    columnValue = filterContactNumber || "";
                    break;
                  default:
                    columnValue =
                      field.fieldType === "image"
                        ? "null"
                        : field.fieldType === "dropdown"
                        ? field.options[0].optionId.toString()
                        : "";
                    break;
                }
                acc.push({
                  columnName: field.columnName,
                  columnValue,
                });
              });
            }
          });
        }
        return acc;
      }, []);

      setFormData(initialData);
    }
  }, [
    formState,
    filterContactNumber,
    filterFirstName,
    filterLastName,
    filterEmail,
  ]);

  const handleFieldChange = (columnName, columnValue) => {
    console.log(columnName,columnValue);
    // Find the index of the column in formData
    const columnIndex = formData.findIndex(
      (data) => data.columnName === columnName
    );

    // If the column is already in formData, update the value; otherwise, add a new entry
    if (columnIndex !== -1) {
      setFormData((prevData) => {
        const newData = [...prevData];
        newData[columnIndex].columnValue = columnValue;
        return newData;
      });
    } else {
      setFormData((prevData) => [
        ...prevData,
        {
          columnName,
          columnValue,
        },
      ]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data:", formData);

    const requiredFieldsEmpty = formState.sections.some((section) =>
      section.containers.some((container) =>
        container.fields.some(
          (field) =>
            field.isRequired &&
            !formData.find((item) => item.columnName === field.columnName)
              ?.columnValue
        )
      )
    );
    if (requiredFieldsEmpty) {
      customSnackBar("Please fill in all required fields.");
      return;
    }
    try {
      dispatch(setIsLoadingTrue());
      const filteredData = formData.filter((item)=>item.columnValue.trim());
      const data = {
        customers: filteredData,
        businessId: selectedBusinessId,
        createdBy: userID,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/customer_svc/pv/Customers/addNewCustomerDynamically`,
        data
      );
      if (response.data.code === 0) {
        if (isModal) {
          handleSelectedCustomer(response.data.result.customer);
          handleFormSubmission();
        } else {
          history.goBack();
        }
        customSnackBar("Added Customer Successfully");
      } else {
        const message = response?.data?.message;
        customSnackBar(`Error Occured: ${message}`);
      }
    } catch (e) {
      customSnackBar(e);
    } finally {
      dispatch(setIsLoadingFalse());
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center ">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <form
          className={isModal ? "dynamic_formModal" : "dynamic_formContainer"}
          onSubmit={handleFormSubmit}
        >
          {formState?.sections?.map((item, index) => (
            <div
              key={index}
              className={`${index !== 0 ? "dynamicform_section" : "mt-1"}`}
            >
              <span className="dynamicform_sectionTitle">
                {item.sectionTitle}
                <span
                  className={index === 0 ? "dynamic_formCompulsory" : "d-none"}
                >
                  {" (Compulsory to fill)"}
                </span>
              </span>
              {item.containers?.map((cont, i) => (
                <div
                  key={i}
                  className="d-flex align-items-center justify-content-center dynamicform_container"
                >
                  {cont.fields?.map((field, ind) => {
                    if (field.title === "image") {
                      return (
                        <ImageInput
                          key={ind}
                          onImageChange={(selectedFile) =>
                            handleFieldChange(field.columnName, "selectedFile")
                          }
                        />
                      );
                    } else if (field.fieldType === "dropdown") {
                      const findIndexOfOptions = formData.findIndex(
                        (item) => item.columnName === field.columnName
                      );
                      return (
                        <DropDown
                          key={ind}
                          isRequired={field.isRequired}
                          id={field.columnName}
                          options={field.options}
                          value={
                            field?.options[
                              field?.options?.findIndex(
                                (item) =>
                                  parseInt(
                                    formData[findIndexOfOptions]?.columnValue
                                  ) === item?.optionId
                              )
                            ]?.optionName
                          }
                          onChange={(value) => {
                            const id = field.options.findIndex(
                              (item) => item.optionName === value
                            );
                            handleFieldChange(
                              field.columnName,
                              field.options[id].optionId.toString()
                            );
                          }}
                          labelKey={field.title}
                          className={
                            ind === 1 && cont.fields.length === 2
                              ? "ms-2"
                              : (ind === 1 && cont.fields.length === 3) ||
                                (ind === 1 && cont.fields.length === 4)
                              ? "mx-2"
                              : ind === 3
                              ? "ms-2"
                              : ""
                          }
                        />
                      );
                    } else if (
                      field.columnName === "primaryMobile" ||
                      field.columnName === "secondaryMobile"
                    ) {
                      return (
                        <CustomPhoneInput
                          title={field.title}
                          isRequired={field.isRequired}
                          classNameParent={`
                            ${ind === 1 && cont.fields.length === 2
                              ? "ms-2"
                              : (ind === 1 && cont.fields.length === 3) ||
                                (ind === 1 && cont.fields.length === 4)
                              ? "mx-2"
                              : ind === 3
                              ? "ms-2"
                              : ""}`
                          }
                          value={
                            formData.find(
                              (item) => item.columnName === field.columnName
                            )?.columnValue || ""
                          }
                          onChange={(value) =>
                            handleFieldChange(field.columnName, value)
                          }
                        />
                      );
                    } else {
                      return (
                        <TextField
                          key={ind}
                          label={field.title}
                          isRequired={field.isRequired}
                          placeholder={`Enter ${field.title}`}
                          type={
                            field.fieldType === "string"
                              ? "text"
                              : field.fieldType === "int"
                              ? "number"
                              : field.fieldType === "date"
                              ? "date"
                              : "text"
                          }
                          value={
                            formData.find(
                              (item) => item.columnName === field.columnName
                            )?.columnValue || ""
                          }
                          classNameParent={
                            ind === 1 && cont.fields.length === 2
                              ? "ms-2"
                              : (ind === 1 && cont.fields.length === 3) ||
                                (ind === 1 && cont.fields.length === 4)
                              ? "mx-2"
                              : ind === 3
                              ? "ms-2"
                              : ""
                          }
                          onHandleChange={(e) =>
                            handleFieldChange(field.columnName, e.target.value)
                          }
                          // error={field.isRequired === true && formData.find((item)=>item.columnName === field.columnName)?.columnValue === ""}
                        />
                      );
                    }
                  })}
                </div>
              ))}
            </div>
          ))}
          <div className="d-flex justify-content-center ">
            <button type="submit" className="dynamic_AddNewCustomer">
              Add New Customer
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddCustomerForm;
