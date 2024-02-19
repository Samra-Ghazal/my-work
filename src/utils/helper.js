import Cookies from "js-cookie";

var CryptoJS = require("crypto-js");

export const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email); 
  };

  export const setStorageData = (key, value) => {
    return localStorage.setItem(key,JSON.stringify(value));
  }

  export const getStorageData = (key) => {
    return JSON.parse(localStorage.getItem(key));
  }

  export const setCookiesData = (key, value) => {
    try {
      if (typeof value !== 'string') {
        throw new Error('Invalid data format');
      }
      const encryptedData = CryptoJS.AES.encrypt(value, "Dad").toString();
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 2);
      Cookies.set(key, encryptedData,{expires: expirationDate});
      return encryptedData;
    } catch (error) {
      console.error('Error in setCookiesData:', error);
      // Handle the error gracefully, e.g., by returning an error message.
      return 'Error: Unable to set data in cookies';
    } // You might want to return the encrypted data for further debugging
  }

  export const setCookiesDataWithTime = (key, value,rememberMe) => {
    try {
      if (typeof value !== 'string') {
        throw new Error('Invalid data format');
      }
      const encryptedData = CryptoJS.AES.encrypt(value, "Dad").toString();
      const expirationDate = new Date();
      if(rememberMe){
        expirationDate.setDate(expirationDate.getDate() + 7);
      }else {
        expirationDate.setDate(expirationDate.getDate() + 1);
      }
      Cookies.set(key, encryptedData,{expires: expirationDate});
      return encryptedData;
    } catch (error) {
      console.error('Error in setCookiesData:', error);
      // Handle the error gracefully, e.g., by returning an error message.
      return 'Error: Unable to set data in cookies';
    } // You might want to return the encrypted data for further debugging
  }

  export const getCookiesData = (key) => {
    const encryptedData = Cookies.get(key);

  try {
    if (encryptedData) {
      const decryptedData = CryptoJS.AES.decrypt(encryptedData, "Dad").toString(CryptoJS.enc.Utf8);
     
      return JSON.parse(decryptedData);
    } else {
      return null; // Return null or handle the case where the cookie data is missing
    }
  } catch (error) {
    console.error('Error in getCookiesData:', error);
    // Handle decryption or parsing errors gracefully
    return null; // Return null or handle the error as appropriate
  }
  }

  export const removeAllCookies = () => {
    const cookies = Cookies.get();
    for (const cookieName in cookies) {
      Cookies.remove(cookieName); // Remove each cookie by name
    }
  }
  


  export const removeAllLocalStorage = () => {
    return localStorage.clear();
  }


  // const formatDate = (dateString) => {
  //   if (!dateString) return ""; // Return empty string if dateString is not provided
  //   const date = new Date(dateString);
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };
  