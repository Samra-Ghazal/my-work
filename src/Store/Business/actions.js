import {
  FETCH_BUSINESS_REQUEST,
  FETCH_BUSINESS_SUCCESS,
  FETCH_BUSINESS_FAILURE,
  ADD_BUSINESS_REQUEST,
  ADD_BUSINESS_SUCCESS,
  ADD_BUSINESS_FAILURE,
  UPDATE_BUSINESS_REQUEST,
  UPDATE_BUSINESS_SUCCESS,
  UPDATE_BUSINESS_FAILURE,
  DELETE_BUSINESS_REQUEST,
  DELETE_BUSINESS_SUCCESS,
  DELETE_BUSINESS_FAILURE,
  ADD_SELECTED_BUSINESS,
  FETCH_COUNTRY_REQUEST,
  FETCH_COUNTRY_SUCCESS,
  FETCH_INDUSTRY_REQUEST,
  FETCH_INDUSTRY_SUCCESS,
  FETCH_BUSINESSTYPE_REQUEST,
  FETCH_BUSINESSTYPE_SUCCESS,
  ADD_ADDRESS_BUSINESS,
  ADD_BUSINESS_ADDRESS_REQUEST,
  ADD_BUSINESS_ADDRESS_SUCCESS,
  ADD_BUSINESS_ADDRESS_FAILURE,
  GET_BUSINESS_SUCCESS,
  GET_BUSINESS_REQUEST,

} from "./actionType";

// Action creators
export const fetchBusinessRequest = (userId) => ({
  type: FETCH_BUSINESS_REQUEST,
  payload: userId,
});

export const fetchBusinessSuccess = (data) => {
  return {
    type: FETCH_BUSINESS_SUCCESS,
    payload: data,
  };
};




export const fetchIndustryRequest = () => ({
  type: FETCH_INDUSTRY_REQUEST,
});

export const fetchIndustrySuccess = (data) => {
  return {
    type: FETCH_INDUSTRY_SUCCESS,
    payload: data,
  };
};


export const fetchTypeRequest = () => ({
  type: FETCH_BUSINESSTYPE_REQUEST,
});

export const fetchTypeSuccess = (data) => {
  return {
    type: FETCH_BUSINESSTYPE_SUCCESS,
    payload: data,
  };
};


export const fetchCountryRequest = (userId) => ({
  type: FETCH_COUNTRY_REQUEST,
  payload: userId,
});

export const fetchCountrySuccess = (data) => {
  return {
    type: FETCH_COUNTRY_SUCCESS,
    payload: data,
  };
};




export const addSelectedBusiness = (data) => {
  return {
    type: ADD_SELECTED_BUSINESS,
    payload: data,
  }
}

export const addedBusinessAddress = (data) => {
  return {
    type: ADD_ADDRESS_BUSINESS,
    payload: data,
  }
}

export const fetchBusinessFailure = (error) => ({
  type: FETCH_BUSINESS_FAILURE,
  payload: error,
});

export const addBusinessRequest = (data) => {
  return{
  type: ADD_BUSINESS_REQUEST,
  payload:data
  };
};
export const addBusinessSuccess = (data) => {
  return{
  type: ADD_BUSINESS_SUCCESS,
  payload:data
  };
};

export const addBusinessFailure = (error) => ({
  type: ADD_BUSINESS_FAILURE,
  payload: error,
});

export const updateBusinessRequest = (data) => {
  return{
  type: UPDATE_BUSINESS_REQUEST,
  payload:data
  };
};

export const updateBusinessSuccess = (data) => {
  return{
  type: UPDATE_BUSINESS_SUCCESS,
  payload: data,
}
}


export const updateBusinessFailure = (error) => ({
  type: UPDATE_BUSINESS_FAILURE,
  payload: error,
});
export const deleteBusinessRequest = (id) => {
  return{ 
  type: DELETE_BUSINESS_REQUEST,
  payload: id,
  }
};

export const deleteBusinessSuccess = (id) => {

  return{
  type: DELETE_BUSINESS_SUCCESS,
  payload: id,
  }
}

export const deleteBusinessFailure = (error) => ({
  type: DELETE_BUSINESS_FAILURE,
  payload: error,
});

export const addBusinessAddressesRequest = (data) => {
  return{
  type: ADD_BUSINESS_ADDRESS_REQUEST,
  payload:data
  };
};
export const addusinessAddressesSuccess = (data) => {
  return{
  type: ADD_BUSINESS_ADDRESS_SUCCESS,
  payload:data
  };
};

export const addusinessAddressesFailure = (error) => ({
  type: ADD_BUSINESS_ADDRESS_FAILURE,
  payload: error,
});




export const getBusinessRequest = (data) => {
 return{
  type: GET_BUSINESS_REQUEST,
  payload: data,
 }
};

export const getBusinessSuccess = (data) => {
  return {
    type: GET_BUSINESS_SUCCESS,
    payload: data,
  };
};
