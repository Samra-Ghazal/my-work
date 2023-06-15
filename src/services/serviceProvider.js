import { API_ENDPOINTS } from "../configs/config";
import makeRequest from "./requestCall";

async function postSchedule(data) {
  return makeRequest(API_ENDPOINTS.POST_SCHEDULE, "post", data);
}
async function getSchedule(data) {
  return makeRequest(API_ENDPOINTS.GET_SCHEDULE, "post", data);
}
async function postdateSchedule(data) {
  return makeRequest(API_ENDPOINTS.POST_DATE_SCHEDULE, "post", data);
}
async function updateSchedule(data) {
  return makeRequest(API_ENDPOINTS.UPDATE_SCHEDULE, "post", data);
}

async function deleteSchedule(data) {
  return makeRequest(API_ENDPOINTS.DELETE_SCHEDULE, "post", data);
}

export {
  postSchedule,
  getSchedule,
  deleteSchedule,
  postdateSchedule,
  updateSchedule,
};
