// import React from "react";
// import { Redirect } from "react-router-dom";
// import { useSelector } from "react-redux";

// export function PrivateRoute({ Component, role, props }) {
// const token =localStorage.getItem("token")

//   const userDetail = useSelector((state) => state.Auth.userloginsuccessyasir);
//   // const userDetail = { token: "shdbuysbd" };
//   if (token) {
   
//     return <Component {...props} />;

//   } else {
//     return <Redirect to="/login" />;
//   }
// }

import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCookiesData, getStorageData } from "../utils/helper";

export function PrivateRoute({ Component, props }) {
  // const auth = getStorageData("auth");
  const auth = getCookiesData("auth");
  // let business = useSelector((state) => state.Business?.data);
  if (auth?.token) {
    return <Component {...props} />;
  } else {
    
    return <Redirect to="/" />;
  }
}

