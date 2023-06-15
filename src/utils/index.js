import { toast } from "react-toastify";
import dayjs from "dayjs";

const DATE = "YYYY-MM-DD";
const TIME = "HH:mm:ss";
const TIMES = "HH:mm:ss";
export const FormateDate = (str) => {
  return str ? dayjs(str).format(DATE) : "";
};
export const FormateTimes = (str) => {
  return str ? dayjs(str).format(TIMES) : "";
};

export const FormateTime = (str) => {
  return str ? dayjs(str).format(TIME) : "";
};

export const success = (value, option = {}) => toast.success(value, option);
export const error = (value, option = {}) => toast.error(value, option);
