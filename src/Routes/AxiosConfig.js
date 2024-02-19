import axios from "axios";

const BASE_URL_API = process.env.REACT_APP_BASE_URL;
const axiosConfig = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

axiosConfig.interceptors.response.use(function (response) {
  return response;
});

export default axiosConfig;
