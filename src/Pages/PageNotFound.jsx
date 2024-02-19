import React from "react";
import { useHistory } from "react-router-dom";
// import "./PageNotFound.css";

const PageNotFound = () => {
  const history = useHistory();
    return <div className="wrapper mt-5">
    <div className="container px-auto">
      <div className="d-flex align-items-center">
        <div>
          <img src="/images/404.png" alt="left" />
          <h1 className="px-spc-b-20">We can't find the page you are looking for.</h1>
          <span className="px-spc-b-20">This page has been relocated or removed.</span>
          <button className="btn btn-warning" onClick={()=>history.push("/dashboard")}><i className="fa fa-home"></i> Go Home</button>
        </div>
        <div className="ms-5">
          <img src="/images/notfound.png" alt="right-shape" />
        </div>
      </div>
    </div>
  </div>
}

export default PageNotFound;