import React from "react";
import { NavLink } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import Logo from "./logo.png";
import { GoBell } from "react-icons/go";
// import BusinessListFromHeader from "./businessListFromHeader";
import { Avatar } from "@mui/material";
import { useHistory } from "react-router-dom";

const SideBarHeader = ({ alluserdata }) => {
  const history = useHistory();
  const location = useLocation();
  return (
    <>
      <div className=" pt-1 pb-2 background_nav1_header">
        <div className="d-flex justify-content-between align-item-center">
          <div className="">
            <div className="">
              <div className="mx-2 ">
                <Link to="/dashboard">
                  <img
                    className="img-fluid"
                    src={Logo}
                    alt="kdsnda"
                    style={{
                      cursor: "pointer",
                      height: "1.8rem",
                      width: "1.8rem",
                    }} // Change cursor on hover
                  />
                </Link>
              </div>
            </div>
          </div>
          {location.pathname.includes("/terms") ||
          location.pathname.includes("/privacy") ? null : (
            <div className="d-flex">
              <div className="d-flex">
                <div className="pt-1 ">
                  <GoBell
                    fontSize={18}
                    color="#fff"
                    alt="np-data"
                    src="/images/bell.svg"
                  />
                </div>
                &nbsp; &nbsp;
                <div
                  className="pt-1 pe-4 hide"
                  role="button"
                  onClick={() => history.push("/settings")}
                >
                  {/* <TfiSettings
               fontSize={19}
               color="#fff" */}
                  <img alt="np-data" src="/images/setting.svg" />
                </div>
                <div className="vl mt-md-0 me-md-3 pb-1" />
              </div>

              {/*-------------------------Selecting Business From Header HERE --------------------------*/}
              {/* {location.pathname.includes("/scheduler/create_booking") ||
              location.pathname.includes("/scheduler/create_break") ||
              location.pathname.includes("/scheduler/create_event") ? null : (
                <BusinessListFromHeader />
              )} */}

              <div className=" pe-3 pt-md-0 section">
                <NavLink to="/Profile">
                  {alluserdata?.imageURL ? (
                    <img
                      className=" width_profile_header"
                      src={alluserdata?.imageURL}
                      alt="B"
                      width="20px"
                      height="20px"
                    />
                  ) : (
                    <Avatar
                      sx={{ width: "2rem", height: "2rem" }}
                      //  src=
                      //  {user.imageURL}
                    />
                  )}
                  {/* <button className="btn btn-warning">Profile</button> */}
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBarHeader;
