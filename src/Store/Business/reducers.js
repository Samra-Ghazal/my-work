import {
  FETCH_BUSINESS_REQUEST,
  FETCH_BUSINESS_SUCCESS,
  FETCH_BUSINESS_FAILURE,
  ADD_BUSINESS_REQUEST,
  ADD_BUSINESS_SUCCESS,
  ADD_SELECTED_BUSINESS,
  DELETE_BUSINESS_REQUEST,
  UPDATE_BUSINESS_REQUEST,
  DELETE_BUSINESS_SUCCESS,
  DELETE_BUSINESS_FAILURE,
  FETCH_COUNTRY_REQUEST,
  FETCH_COUNTRY_SUCCESS,
  FETCH_BUSINESSTYPE_REQUEST,
  FETCH_BUSINESSTYPE_SUCCESS,
  FETCH_INDUSTRY_REQUEST,
  FETCH_INDUSTRY_SUCCESS,
  ADD_ADDRESS_BUSINESS,
  ADD_BUSINESS_ADDRESS_SUCCESS,
  GET_BUSINESS_REQUEST,
  GET_BUSINESS_SUCCESS,
} from "./actionType";
import produce from "immer";

const initialState = {
  rowData: [],
  data: [],
  selectedBusiness: null,
  record: null,
  loading: false,
  result: "",
  updatedRecord: "",
  error: null,
  countryList: "",
  industryList: "",
  businessTypeList: "",
  addedAddress: null,
  address: "",
  businesProfile: [],
};
const Business = produce((state, action) => {
  switch (action.type) {
    case FETCH_BUSINESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BUSINESS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        rowData: action.payload,
      };

    case FETCH_COUNTRY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        countryList: action.payload,
      };

    case FETCH_BUSINESSTYPE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BUSINESSTYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        businessTypeList: action.payload,
      };

    case GET_BUSINESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_BUSINESS_SUCCESS:
      return {
        ...state,
        loading: false,
        businesProfile: action.payload,
      };

    case FETCH_INDUSTRY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_INDUSTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        industryList: action.payload,
      };

    case FETCH_BUSINESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        rowData: [],
        data: [],
        record: null,
      };
    case ADD_BUSINESS_REQUEST:
      state.record = action.payload;
      break;

    case ADD_BUSINESS_SUCCESS:
      state.result = action.payload;
      break; 
    case UPDATE_BUSINESS_REQUEST:
      state.updatedRecord = action.payload;
      break;
    case DELETE_BUSINESS_SUCCESS: {
      const { payload: id } = action;
      return {
        ...state,
        rowData: state.rowData.filter((business) => business.id !== id),
        error: null,
        selectedBusiness: state.selectedBusiness.id === id ? null : state.selectedBusiness,
        data: state.data.filter((business)=>business.id !== id),
      };
    }
    case ADD_SELECTED_BUSINESS: {
      return {
        ...state,
        selectedBusiness: action.payload,
      };
    }
    case ADD_ADDRESS_BUSINESS: {
      return {
        ...state,
        addedAddress: action.payload,
      };
    }
    case ADD_BUSINESS_ADDRESS_SUCCESS:
      state.address = action.payload;
      break;
    case DELETE_BUSINESS_FAILURE: {
      const { payload: error } = action;
      return {
        ...state,
        error,
      };
    }
    default:
      return state;
  }
}, initialState);
export default Business;
