import { takeLatest, put, fork, all, select } from "redux-saga/effects";
import {
  fetchBusinessSuccess,
  fetchBusinessFailure,
  deleteBusinessFailure,
  fetchCountrySuccess,
  fetchTypeRequest,
  fetchIndustryRequest,
  fetchIndustrySuccess,
  fetchTypeSuccess,
  getBusinessSuccess,
  deleteBusinessSuccess,
  fetchBusinessRequest,
  addSelectedBusiness,
} from "./actions";
import {
  ADD_BUSINESS_ADDRESS_FAILURE,
  ADD_BUSINESS_ADDRESS_REQUEST,
  ADD_BUSINESS_ADDRESS_SUCCESS,
  ADD_BUSINESS_FAILURE,
  ADD_BUSINESS_REQUEST,
  ADD_BUSINESS_SUCCESS,
  DELETE_BUSINESS_REQUEST,
  FETCH_BUSINESSTYPE_REQUEST,
  FETCH_BUSINESS_REQUEST,
  FETCH_COUNTRY_REQUEST,
  FETCH_INDUSTRY_REQUEST,
  GET_BUSINESS_REQUEST,
  UPDATE_BUSINESS_FAILURE,
  UPDATE_BUSINESS_SUCCESS,
} from "./actionType";
import axiosConfig from "../../Routes/AxiosConfigg";
import { customSnackBar, success, warning } from "../../utils";
import { NO_DATA_FOUND, businessList } from "../../utils/constant";
import { push } from "connected-react-router";

function* fetchBusiness(action) {
  const { payload: userId } = action;
  try {
    const response = yield axiosConfig.get(
      `business_svc/pb/business/?userId=${userId}`
    );
    if (response.data.code === 0) {
      if (response.data.result.length === 0) {
        // customSnackBar(NO_DATA_FOUND);
        yield put(fetchBusinessSuccess([]));
        yield put(fetchBusinessFailure(NO_DATA_FOUND));
      } else {
        // success(businessList.BUSINESS_FETCH);
        yield put(fetchBusinessSuccess(response.data.result));
      }
    } else {
      yield put(fetchBusinessSuccess([]));
      yield put(fetchBusinessFailure(response.data.message));
    }
  } catch (customSnackBar) {
    yield put(fetchBusinessSuccess([]));
    // customSnackBar(customSnackBar.response.data.message);
    yield put(fetchBusinessFailure(customSnackBar.message));
  }
}

function* getBusinessProfile(action) {
  const { payload: businesId } = action;

  try {
    action?.payload?.setLoading(true);

    const response = yield axiosConfig.get(
      `/business_svc/pb/business/${action?.payload?.newid}`
    );
    if (response.data.code === 0) {
      yield put(getBusinessSuccess(response.data.result));
      action?.payload?.setLoading(false);

    } else {
    }
  } catch (customSnackBar) {
    action?.payload?.setLoading(false);

    // customSnackBar(customSnackBar.response.data.message);
  }
}

function* addBusinessSaga({ payload }) {
  try {
    payload.setLoading(true);
    const data = payload.data;

    const response = yield axiosConfig.post("business_svc/pb/business/", data);
    payload.setLoading(false);
    if (response.data.code === 0 || response.data.code === 1) {
      // success(businessList.BUSINESS_CREATE);
      if (payload.step === "onboarding") {
        // yield put(push( `/on-board/${payload.stepRecord.onboarding_type}`))
        window.location.assign(
          `/on-board/${payload.stepRecord.onboarding_type}`
        );
        payload.handleCompleteClick();
      } else {
        if (payload.flag) {
          // payload.history.push("/select-address")
          window.location = "/select-address";
          // yield put(push("/select-address"));
        } else {
          payload.setActionState("edit");
          payload.handleNext();
        }
      }
      payload.setResult(response.data.result);
      yield put({ type: ADD_BUSINESS_SUCCESS, payload: response.data.result });
    }
    // else if (response.data.code === 1) {
    //   customSnackBar(response.data.message);
    //   yield put({ type: ADD_BUSINESS_FAILURE, payload: response.data.message });
    // } else {
    //   customSnackBar(response.data.message);
    // }
  } catch (errors) {
    payload.setLoading(false);
    customSnackBar(errors.response.data.message);
    yield put({ type: ADD_BUSINESS_FAILURE, payload: "" });
  }
}

function* addBusinessSagas({ payload }) {

  try {
    payload.setLoading(true);
    const data = payload.data;

    const response = yield axiosConfig.post("business_svc/pb/business/", data);
    payload.setLoading(false);
    if (response.data.code === 0) {
      yield put(push(`/select-address`, response.data.result));

      yield put({ type: ADD_BUSINESS_SUCCESS, payload: response.data.result });
    } else {
      warning(response.data.message);
      yield put({ type: ADD_BUSINESS_FAILURE, payload: "" });
    }
    // if (response.data.code === 0 ) {

    //   }
    //   payload.setResult(response.data.result);
    //   yield put({ type: ADD_BUSINESS_SUCCESS, payload: response.data.result });
    // }
  } catch (errors) {
    payload.setLoading(false);
    customSnackBar(errors.response.data.message);
    yield put({ type: ADD_BUSINESS_FAILURE, payload: "" });
  }
}

function* updateBusinessSaga({ payload }) {
  try {
    payload.setLoading(true);
    const data = payload.data;
    const response = yield axiosConfig.patch(
      `business_svc/pb/business/${payload.id}/`,
      data
    );
    payload.setLoading(false);
    if (response.data.code === 0) {
      // success(businessList.BUSINESS_UPDATED);
      // payload.history.push("/business/");
      yield put(push(`/business-profile/${payload.id}`));
      payload.setShowNewRole(false);
    payload.setLoading(false);

      // if(payload.action==="editType"){
      //   payload.setShowType(false)
      // }
      // if(payload.action==="editWebsite"){
      //   payload.setShowWebsite(false)
      // }
      yield put({
        type: UPDATE_BUSINESS_SUCCESS,
        payload: response.data.result,
      });

      yield put(fetchBusinessRequest(payload.userID));
    } else {
      customSnackBar(response.data.message);
    payload.setLoading(false);

      // yield put({ type: UPDATE_BUSINESS_FAILURE, payload: response.data.message });
    }
  } catch (errors) {
    payload.setLoading(false);

    yield put({ type: UPDATE_BUSINESS_FAILURE, payload: "" });
  }
}
function* deleteBusinessSaga({ payload }) {
  try {
    // Call the delete API function passing the ID
    const response = yield axiosConfig.delete(
      `business_svc/pb/business/${payload.id}/`
    );
    if (response.data.code === 0) {
      payload.setRecord(payload.data.filter((item) => item.id !== payload.id));
      yield put(deleteBusinessSuccess(payload.id));
      const list = yield select((state) => state.Business.data);
      debugger;
      if (list.length === 0) {
        yield put(push("/dashboard"));
      }
    } else {
      customSnackBar(response.data.message);
      yield put(deleteBusinessFailure(response.message));
    }
  } catch (error) {
    error("Null");
    yield put(deleteBusinessFailure(error.response.data.message));
  }
}

function* fetchCountry(action) {
  const { payload: userId } = action;
  try {
    const response = yield axiosConfig.get(
      `signup_svc/pv/country/getAllCountries`
    );
    if (response.data) {
      yield put(fetchCountrySuccess(response?.data?.result));
    }
  } catch (customSnackBar) {
    // customSnackBar(customSnackBar.response.data.message);
  }
}

function* fetchBusinesType(action) {
  const { payload: userId } = action;
  try {
    const response = yield axiosConfig.get(`business_svc/pb/business_type/`);

    if (response?.data?.code===0) {
      yield put(fetchTypeSuccess(response?.data?.result));
    }
  } catch (customSnackBar) {
    // customSnackBar(customSnackBar.response.data.message);
  }
}

function* fetchIndustries(action) {
  const { payload: userId } = action;
  try {
    const response = yield axiosConfig.get(
      `business_svc/pb/business_industry/`
    );
    if (response?.data?.code===0) {
      yield put(fetchIndustrySuccess(response?.data?.result));
    }
  } catch (customSnackBar) {
    // customSnackBar(customSnackBar.response.data.message);
  }
}

function* updateBusinessAddressSaga({ payload }) {
  try {
    payload.setLoading(true);
    const data = payload.data;
    const action = "new";

    const response = yield axiosConfig.patch(
      `business_svc/pb/api/add_business_address/${payload.id}`,
      data
    );
    payload.setLoading(false);
    if (response.data.code === 0) {
      if (payload.action === "edit") {
        yield put(push(`/business-profile/${payload.id}`));
      } else {
        const data = {
          action: "new",
          data: response?.data?.result?.id,
        };
        yield put(push(`/add-business-schedular/${response?.data?.result?.id}`, data));
      }

      yield put({
        type: ADD_BUSINESS_ADDRESS_SUCCESS,
        payload: response.data.result,
      });
    } else {
      customSnackBar(response.data.message);
      // yield put({ type: UPDATE_BUSINESS_FAILURE, payload: response.data.message });
    }
  } catch (errors) {
    payload.setLoading(false);
    customSnackBar(errors.response.data.message);
    yield put({ type: ADD_BUSINESS_ADDRESS_FAILURE, payload: "" });
  }
}
export function* fetchBusinessBinder() {
  yield takeLatest(FETCH_BUSINESS_REQUEST, fetchBusiness);
}

export function* addBusinessWatcher() {
  yield takeLatest(ADD_BUSINESS_REQUEST, addBusinessSagas);
}
export function* updateBusinessWatcher() {
  yield takeLatest(UPDATE_BUSINESS_SUCCESS, updateBusinessSaga);
}
export function* deleteBusinessWatcher() {
  yield takeLatest(DELETE_BUSINESS_REQUEST, deleteBusinessSaga);
}
export function* fetchCountryBinder() {
  yield takeLatest(FETCH_COUNTRY_REQUEST, fetchCountry);
}
export function* fetchBusinessTypeBinder() {
  yield takeLatest(FETCH_BUSINESSTYPE_REQUEST, fetchBusinesType);
}
export function* fetchInustryBinder() {
  yield takeLatest(FETCH_INDUSTRY_REQUEST, fetchIndustries);
}
export function* editBusinessAddressBinder() {
  yield takeLatest(ADD_BUSINESS_ADDRESS_REQUEST, updateBusinessAddressSaga);
}
export function* getBusinessDetail() {
  yield takeLatest(GET_BUSINESS_REQUEST, getBusinessProfile);
}
export default function* businessSaga() {
  yield all([
    fork(fetchBusinessBinder),
    fork(addBusinessWatcher),
    fork(updateBusinessWatcher),
    fork(deleteBusinessWatcher),
    fork(fetchCountryBinder),
    fork(fetchBusinessTypeBinder),
    fork(fetchInustryBinder),
    fork(editBusinessAddressBinder),
    fork(getBusinessDetail),
  ]);
}
