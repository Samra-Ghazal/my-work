import React, { useEffect, useState } from "react";
import SideNavone from "../../SideNavBar";
import { useDispatch, useSelector } from "react-redux";
import SectionComponent from "./sections";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  addSection,
  getFormData,
  setIntialForm,
  setIsLoadingFalse,
  setIsLoadingTrue,
} from "../../Store/dynamicForm/slice";
import { customSnackBar } from "../../utils";

const PreviewPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.DynamicForm.isLoading);
  const form = useSelector((state) => state.DynamicForm.form);
  const userID = useSelector(
    (state) => state.Auth.userloginsuccessyasir.users.id
  );
  const selectedBusinessId = useSelector(
    (state) => state.DynamicForm.selectedBusiness
  );
  const formId = useSelector((state) => state.DynamicForm.formId);
  const [loading, setLoading] = useState(false);
  const saveFormHandler = async (e) => {
    e.preventDefault();
    if (form.sections.length === 0) {
      customSnackBar("At least one section must be present.");
    } else {
      dispatch(setIsLoadingTrue());
      try {
        if (formId === 0) {
          await addAndPublishForm();
        } else {
          await unpublishForm();
        }
        dispatch(setIntialForm());
        history.goBack();
      } catch (e) {
        customSnackBar(e.message || "An error occurred");
      } finally {
        dispatch(setIsLoadingFalse());
      }
    }
  };

  useEffect(() => {
    console.log(" request first");
    dispatch(getFormData(123));
  }, [dispatch]);
  const unpublishForm = async () => {
    try {
      const unPublishPayload = {
        id: formId,
        modifiedBy: userID,
      };
      const unpublishResponse = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/customer_svc/pv/BusinessForms/unpublishBusinessForms`,
        unPublishPayload
      );
      if (unpublishResponse.data.code !== 0) {
        throw new Error(
          unpublishResponse.data.message || "Failed to unpublish form"
        );
      } else {
        await addAndPublishForm();
      }
    } catch (error) {
      throw new Error(
        error.message || "An error occurred while unpublishing form"
      );
    }
  };

  const addAndPublishForm = async () => {
    try {
      const data = {
        businessId: selectedBusinessId,
        result: form,
        createdBy: userID,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/customer_svc/pv/BusinessForms/addBusinessForms`,
        data
      );
      if (response.data.code !== 0) {
        throw new Error(response.data.message || "Failed to add form");
      }
      const publishPayload = {
        id: response.data.result.id,
        modifiedBy: userID,
      };
      const publishResponse = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/customer_svc/pv/BusinessForms/publishBusinessForms`,
        publishPayload
      );
      if (publishResponse.data.code !== 0) {
        throw new Error(publishResponse.data.message || "Failed to add form");
      }
    } catch (e) {
      throw new Error(
        e.message || "An error occurred while adding and publishing form"
      );
    }
  };

  const createSection = () => {
    dispatch(addSection());
    history.replace("/dynamic-form");
  };
  const formState = useSelector((state) => state.DynamicForm.form);
  return (
    <SideNavone>
      {isLoading || loading ? (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center ">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <form className="dynamic_formContainer">
          <div className="d-flex justify-content-start align-items-center">
            <div
              className="pt-2"
              onClick={() => history.goBack()}
              role="button"
            >
              <i id="icon_left_color" className="fas fa-chevron-left"></i>
            </div>
            <p className="dynamic_heading">You are Previewing this page</p>{" "}
          </div>
          {formState?.sections?.map((item, index) => (
            <div key={index} className="mb-4">
              <SectionComponent isPreview={true} section={item} index={index} />{" "}
            </div>
          ))}
          <div className="d-flex justify-content-end mt-4">
            <button
              className="dynamic_borderButton px-4 me-4"
              onClick={createSection}
            >
              Create Section
            </button>
            <button
              className="dynamic_blueButton px-5"
              onClick={saveFormHandler}
            >
              Save
            </button>
          </div>
        </form>
      )}
    </SideNavone>
  );
};

export default PreviewPage;
