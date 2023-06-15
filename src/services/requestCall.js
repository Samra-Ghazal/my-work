import axios from "axios";
import { API_BASE_URL } from "../configs/config";
const errors = {
  error: true,
  data: [],
  message: "Something went wrong, please try again!",
  statusCode: 1,
};
async function makeRequest(url, method, data) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      data,
      url: API_BASE_URL + url,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    return (
      error?.response?.data || errors // Assuming `errors` is defined
    );
  }
}
export default makeRequest;
