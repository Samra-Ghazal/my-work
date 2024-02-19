import axios from 'axios';

axios.defaults.headers = {
    'Content-Type': 'application/json',
     Accept: 'application/json',
    'Authorization':'Bearer ' + process.env.NEXT_PUBLIC_APP_AUTH_TOKKEN
  };
const testAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_TEST_AXIOS
  });

const mainAxios = axios.create({
  baseURL: "http://172.187.153.193:8038/"
});
const serviceAxios = axios.create({
  baseURL: "http://172.187.153.193:8042/"
});
const slotAxios = axios.create({
  baseURL: "http://172.187.153.193:8081/"
});
const customerAxios = axios.create({
  baseURL: "http://172.187.153.193:8043"
});
const salesOrderAxios = axios.create({
  baseURL: "http://172.187.153.193:8036"
});
const bookingAxios = axios.create({
  baseURL: "http://172.187.153.193:8037"
});
const clinicAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_CLINIC_AXIOS
});

export { mainAxios, serviceAxios, slotAxios, customerAxios, salesOrderAxios, bookingAxios,clinicAxios, testAxios };