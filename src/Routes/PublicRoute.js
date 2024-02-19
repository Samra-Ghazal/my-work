// import React, { Suspense } from "react";
// import { useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";

// export function PublicRoute({ Component, props }) {

//   const userDetail = useSelector((state) => state.Auth);
// const token =localStorage.getItem("token")

//   if (userDetail.tokenn) {
//     return <Redirect to={"/Dashboard-Admin"} />;
//   } else {
//     return   <Component {...props} />;
//   }
// }

import React from "react";
// import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCookiesData, getStorageData } from "../utils/helper";
import { useLocation } from "react-router-dom";

export function PublicRoute({ Component, props }) {
  // const auth = getStorageData("auth");
  const auth = getCookiesData("auth");
  const location = useLocation();
  // let busienss= useSelector((state) => state.Business?.data)

  // if (auth?.token && !location.pathname.includes("/verify-number/")) {
  //   return <Redirect to="/calendar" />;
  // } else {
  return <Component {...props} />;
  // }
}
