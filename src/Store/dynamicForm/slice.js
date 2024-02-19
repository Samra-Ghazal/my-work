// formSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFormData = createAsyncThunk(
  "clinics/getFormData",
  async (data, { getState }) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/customer_svc/pv/BusinessForms/getBusinessFormByBusinessId?businessId=${data}`
    );
    return { data: response.data, businessId: data };
  }
);

const initialState = {
  form: {
    maxWidth: 0,
    sections: [],
  },
  selectedContainerPosition: 0,
  isLoading: false,
  title: "",
  selectedSection: {},
  selectedBusiness: -1,
  formId: -1,
};

const dynamicForm = createSlice({
  name: "dynamicform",
  initialState,
  reducers: {
    setIntialForm: (state) => {
      return initialState;
    },
    addSection: (state) => {
      const newPosition = state.form.sections.length;
      return {
        ...state,
        selectedSection: {
          position: newPosition,
          sectionTitle: "",
          containers: [],
        },
      };
    },

    deleteSection: (state, action) => {
      const sectionToBeDeleted = action.payload;
      return {
        ...state,
        form: {
          ...state.form,
          sections: state.form.sections
            .filter((item) => item.position !== sectionToBeDeleted)
            .sort((a, b) => a.position - b.position)
            .map((obj, index) => ({ ...obj, position: index })),
        },
      };
    },
    addSectionTitle: (state, action) => {
      return {
        ...state,
        selectedSection: {
          ...state.selectedSection,
          sectionTitle: action.payload,
        },
      };
    },
    addContainer: (state, action) => {
      const newPosition = state.selectedSection.containers.length;
      return {
        ...state,
        selectedSection: [
          ...state.selectedSection.containers,
          {
            containerType: "oneField",
            containerDirection: "horizontal",
            contentAdjustment: "equalSpacing",
            position: newPosition,
            fields: [],
          },
        ],
        selectedContainerPosition: newPosition,
      };
    },
    addContainerAtPosition: (state, action) => {
      const position = action.payload + 1;
      const newObj = {
        containerType: "oneField",
        containerDirection: "horizontal",
        contentAdjustment: "equalSpacing",
        position: position,
        fields: [],
      };
      return {
        ...state,
        selectedSection: {
          ...state.selectedSection,
          contianers: [
            ...state.selectedSection.containers.slice(0, position),
            newObj,
            ...state.selectedSection.containers.slice(position),
          ].map((container, index) => ({ ...container, position: index })),
        },
        selectedContainerPosition: position,
      };
    },
    selectedContainerChange: (state, action) => {
      return {
        ...state,
        selectedContainerPosition: action.payload,
      };
    },
    addFields: (state, action) => {
      const selectedContainer = state.selectedSection.containers.find(
        (i) => i.position === state.selectedContainerPosition
      );
      const nextPosition = selectedContainer.fields.length;
      const fieldWithPosition = {
        ...action.payload,
        position: nextPosition,
      };

      return {
        ...state,
        selectedSection: {
          ...state.selectedSection,
          containers: state.selectedSection.containers.map((container) => {
            if (container.position === selectedContainer.position) {
              return {
                ...container,
                fields: [...container.fields, fieldWithPosition],
              };
            }
            return container;
          }),
        },
      };
    },
    removeFields: (state, action) => {
      const selectedContainer = state.selectedSection.containers.find(
        (i) => i.position === state.selectedContainerPosition
      );
      const updatedFields = state.selectedSection.containers.map(
        (container) => {
          if (container.position === selectedContainer.position) {
            return {
              ...container,
              fields: container.fields
                .filter((itm) => itm.columnName !== action.payload)
                .sort((a, b) => a.position - b.position)
                .map((obj, index) => ({ ...obj, position: index })),
            };
          }
          return container;
        }
      );
      return {
        ...state,
        selectedSection: {
          ...state.selectedSection,
          containers: updatedFields,
        },
      };
    },
    changeIsRequiredField: (state, action) => {
      const { isRequired, fieldPosition } = action.payload;
      const selectedContainer = state.selectedSection.containers.find(
        (i) => i.position === state.selectedContainerPosition
      );
      const selectedField = selectedContainer.fields.find(
        (i) => i.position === fieldPosition
      );
      if (selectedField) {
        selectedField.isRequired = isRequired;
      }
      return state;
    },
    selectedSectionChange: (state, action) => {
      state.selectedSection = action.payload;
      return state;
    },
    insertSection: (state) => {
      const existingSectionIndex = state.form.sections.findIndex(
        (section) => section.position === state.selectedSection.position
      );
      if (existingSectionIndex !== -1) {
        state.form.sections.splice(
          existingSectionIndex,
          1,
          state.selectedSection
        );
      } else {
        state.form.sections.push(state.selectedSection);
      }
      state.selectedSection = {};
      state.selectedContainerPosition = 0;
      return state;
    },
    setIsLoadingTrue: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    setIsLoadingFalse: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getFormData.pending, (state) => {
      state.isLoading = true;
      return state;
    });
    builder.addCase(getFormData.fulfilled, (state, action) => {
      state.isLoading = false;
      const parsedData = JSON.parse(action.payload.data);
      let forms;
      forms = parsedData.result.data;
      state.formId = parsedData.result.id;
      state.form = forms;
      state.selectedBusiness = action.payload.businessId;
      return state;
    });
    builder.addCase(getFormData.rejected, (state) => {
      state.isLoading = false;
      return state;
    });
  },
});

export const {
  setIntialForm,
  changeIsRequiredField,
  removeFields,
  addFields,
  deleteSection,
  selectedContainerChange,
  addContainer,
  addSectionTitle,
  addSection,
  insertSection,
  selectedSectionChange,
  addContainerAtPosition,
  setIsLoadingTrue,
  setIsLoadingFalse,
} = dynamicForm.actions;
export const dynamicFormSlice = dynamicForm.reducer;
