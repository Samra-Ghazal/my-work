import { Box, Button, Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FiSearch, FiX } from "react-icons/fi";
import { InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import useCheckPermission, { customSnackBar } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { RxCrossCircled } from "react-icons/rx";

// import {
//   searchText,
//   searchTextCustomer,
//   searchTextEmail,
//   searchTextFirstName,
//   searchTextLastName,
//   searchTextnumber,
// } from "../Pages/Dashboard/MainComponent/store/StaffSlice";
import debounce from "lodash/debounce";
import { getFormData } from "../Store/dynamicForm/slice";
const NavBarHeading = ({
  backtostafflising,
  selectedBusines,
  handleMoreOptionsClick,
  rowData,
  record,
  data,
  setRowData,
  buttonText,
  link,
  OnSearch,
  onClick,
  handleClick,
}) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [openAction, setOpenAction] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select option");
  const [permission, setPermissions] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const businessId = JSON.parse(localStorage.getItem("businessRecord"));
  const [searchValues, setSearchValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
  });

  const handleMenuActionClick = (event, data, rowIndex) => {
    setOpenAction(true);
    setAnchorEl(event.currentTarget);

    // setSelectedRow(row.id);
    // setSelecteData(data);
  };
  const handleMenuClose = () => {
    setOpenAction(false);
    setAnchorEl(null);
  };
  const [isSearchVisible, setIsSearchVisible] = useState(true);

  const providerDatas = JSON.parse(localStorage.getItem("StaffRecord"));

  const handleSearchIconClick = () => {
    // Toggle the search visibility state
    setIsSearchVisible((prev) => !prev);
  };
  // Handler to update the selected value when the user selects an option

  const handleBusinesSelection = () => {
    if (selectedBusines === null) {
      alert("Plese Select/Add the Business");
    } else {
      history.push(`/add-staff/${selectedBusines?.id}`);
    }
  };
  const handleOptionChange = (option) => {
    if (option === "Booking") {
      history.push("/scheduler/create_booking");
    } else if (option === "Event") {
      history.push("/scheduler/create_event");
    } else if (option === "Break") {
      history.push("/scheduler/create_break");
    }
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  const result = useCheckPermission("Staff", "create").then((res) => {
    setPermissions(res);
  });
  useEffect(() => {
    if (permission === false && location.pathname.includes("/staff-list")) {
      customSnackBar("You have not a Permssion To Add Staff");
    }
  }, [permission]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
      setIsTablet(window.innerWidth >= 600 && window.innerWidth <= 1200);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const options = ["Booking", "Event", "Break"];

  const handleInputChanges = (fieldType, e) => {
    const inputValue = e.target.value;
    setSearchValues((prevValues) => ({
      ...prevValues,
      [fieldType]: inputValue,
    }));
    // handleDebouncedSearchs(fieldType, inputValue);
  };

  return (
    <>
      {location.pathname.includes("/all-listing") ||
      location.pathname.includes("/staff-list") ||
      location.pathname.includes("/all-services") ||
      location.pathname.includes("/subscribe") ||
      location.pathname.includes("/scheduler/create_booking") ||
      location.pathname.includes("/scheduler/create_event") ||
      location.pathname.includes("/scheduler/create_break") ||
      location.pathname.includes("/all-customer") ||
      location.pathname.includes("/customer-form") ||
      location.pathname.includes("/Profile") ||
      location.pathname.includes("/our-faculty") ||
      location.pathname.includes("/edit-map") ||
      location.pathname.includes("/add-new-business") ||
      // location.pathname.includes("/services-attribute") ||
      location.pathname.includes("/create-new-service") ||
      location.pathname.includes(`/business-profile/${businessId?.id}`) ||
      location.pathname.includes("/edit-business-name") ||
      location.pathname.includes("/add-owner-details") ||
      location.pathname.includes("/select-address") ||
      location.pathname.includes("/add-business-schedular/:id") ||
      location.pathname.includes("/note") ||
      location.pathname.includes("/team") ||
      location.pathname.includes("/business/") ||
      location.pathname.includes("/edit-owner-detail") ||
      location.pathname.includes("/department") ||
      location.pathname.includes("/customer-profile-view/") ||
      location.pathname.includes("/users") ||
      location.pathname.includes("/customer-bookings") ||
      location.pathname.includes(`providerScheduler/:id`) ||
      location.pathname.includes("/edit-business-address") ||
      location.pathname.includes("/change-user-password") ||
      location.pathname.includes("/edit-industry-type") ||
      location.pathname.includes("/add-business-address") ||
      location.pathname.includes("/edit-business-type") ||
      location.pathname.includes("/edit-business-website") ||
      location.pathname.includes("/staff-profile-view") ? (
        <div
          className={`${isMobile ? "px-0 py-0 " : " px-2 py-1"} col-md-12 ${
            isMobile ? "bg-none" : "bg-white second_nav"
          } `}
        >
          <div className="d-flex justify-content-between">
            <div className={`${!isMobile ? "" : " ps-0 pe-0"}`}>
              <div className={`${!isMobile ? "flex_in_calendex_bar" : ""}`}>
                <div>
                  {location.pathname.includes("/staff-profile-view") ? (
                    //  ||
                    // location.pathname.includes("/add-new-business")
                    <span onClick={backtostafflising} className="px-2">
                      <i className="fas fa-arrow-left"></i>
                    </span>
                  ) : isMobile ||
                    location.pathname.includes("/calendar") ? null : (
                    <img
                      className="img-fluid img_size_cal"
                      src="/images/cal.png"
                      alt="no-data"
                    />
                  )}
                </div>
                <div>
                  {location.pathname.includes("/customer-profile-view/") ? (
                    //  ||
                    // location.pathname.includes("/add-new-business")
                    <span onClick={() => history.goBack()} className="px-2">
                      <i className="fas fa-arrow-left"></i>
                    </span>
                  ) : null}
                </div>
                {!isMobile ? (
                  <div className="px-2 ">
                    {location.pathname.includes("/staff-list") ||
                    location.pathname.includes("/our-faculty") ? (
                      <div className="d-flex my-auto">
                        <p className="my-auto mx-2 p-0">
                          <strong> Staff </strong>
                        </p>
                      </div>
                    ) : location.pathname.includes("/staff-profile-view") ? (
                      <p className="m-0 px-0 pt-1 staff_prof_font">
                        {" "}
                        Staff Profile{" "}
                      </p>
                    ) : location.pathname.includes("/create-new-service") ? (
                      <p className="m-0 p-0"> Add Service </p>
                    ) : location.pathname.includes("/all-listing") ? (
                      <p className="m-0 p-0"> Add Service </p>
                    ) : location.pathname.includes("/note") ? (
                      <p className="m-0 p-0"> Notes </p>
                    ) : location.pathname.includes(
                        "/customer-profile-view/"
                      ) ? (
                      <p className="m-0 p-0"> Customer Profile </p>
                    ) : location.pathname.includes("/customer-form") ? (
                      <p className="m-0 p-0"> Customer Dynamic Form </p>
                    ) : location.pathname.includes("/customer-bookings") ? (
                      <p className="m-0 p-0"> Customer Bookings </p>
                    ) : location.pathname.includes("/business/") ? (
                      <p className="m-0 p-0"> Manage Businesses </p>
                    ) : location.pathname.includes("/team") ? (
                      <p className="m-0 p-0"> Manage Team </p>
                    ) : location.pathname.includes("/department") ? (
                      <p className="m-0 p-0"> Manage Departments </p>
                    ) : location.pathname.includes("/users") ? (
                      <p className="m-0 p-0"> Manage Users </p>
                    ) : location.pathname.includes("/change-user-password") ? (
                      <p className="m-0 p-0"> Change User Password </p>
                    ) : location.pathname.includes("/all-customer") ? (
                      <p className="m-0 p-0"> Customer </p>
                    ) : location.pathname.includes(
                        "/add-business-schedular/:id"
                      ) ? (
                      <p className="m-0 p-0"> Business Opening Hour </p>
                    ) : location.pathname.includes("/all-services") ? (
                      <p className="m-0 p-0"> Services </p>
                    ) : // ) : location.pathname.includes(
                    //     "/services-attribute"
                    //   ) ? (
                    // <p className="m-0 p-0"> Services Attribute </p>
                    location.pathname.includes("/add-new-business") ? (
                      <p className="m-0 p-0"> Add Business </p>
                    ) : location.pathname.includes(
                        "/scheduler/create_event"
                      ) ? (
                      <p className="m-0 p-0"> Add Event </p>
                    ) : location.pathname.includes("/select-address") ||
                      location.pathname.includes("/add-business-address") ? (
                      <p className="m-0 p-0"> Business Location </p>
                    ) : location.pathname.includes("/add-owner-details") ? (
                      <p className="m-0 p-0"> Add Business Detail </p>
                    ) : location.pathname.includes(
                        "/scheduler/create_booking"
                      ) ? (
                      <p className="m-0 py-0 ps-3">
                        <strong> Add Booking </strong>
                      </p>
                    ) : location.pathname.includes(
                        "/scheduler/create_break"
                      ) ? (
                      <p className="m-0 py-0 ps-3">
                        <strong> Add Break </strong>
                      </p>
                    ) : location.pathname.includes("/subscribe") ? (
                      <p className="m-0 p-0"> Products </p>
                    ) : location.pathname.includes("/edit-business-name") ||
                      location.pathname.includes("/edit-business-address") ||
                      location.pathname.includes("/edit-industry-type") ||
                      location.pathname.includes("/edit-owner-detail") ||
                      location.pathname.includes("/edit-business-type") ||
                      location.pathname.includes("/edit-map") ||
                      location.pathname.includes("/edit-business-website") ? (
                      <p className="m-0 p-0"> Manage Business Profile </p>
                    ) : location.pathname.includes(
                        `/business-profile/${businessId?.id}`
                      ) ? (
                      <p className="m-0 p-0"> Business Profile </p>
                    ) : location.pathname.includes("/Profile") ? (
                      <p className="m-0 p-0"> Manage Profile </p>
                    ) : location.pathname.includes("/notes") ? (
                      <p className="m-0 p-0"> Notes </p>
                    ) : location.pathname.includes(
                        `providerScheduler/${selectedBusines?.id}`
                      ) ? (
                      <p className="m-0 p-0"> Scheduler </p>
                    ) : (
                      <p className="m-0 p-0">
                        {" "}
                        Name For This Page Not Added Yet{" "}
                      </p>
                    )}
                  </div>
                ) : null}
                {location.pathname.includes("/all-customer") ||
                location.pathname.includes("/staff-list") ||
                location.pathname.includes("/our-faculty")
                  ? !isSearchVisible && (
                      <>
                        <div className="pt-1"> </div>
                      </>
                    )
                  : null}
                {location.pathname.includes("/business/") ||
                location.pathname.includes("/users") ||
                location.pathname.includes("/department") ||
                location.pathname.includes("/team") ? (
                  <div className="pt-1"> </div>
                ) : null}

                {location.pathname.includes("/all-customer") ? (
                  <div className="pt-1">
                    {" "}
                    {/* <div className="pe-1">
                      <FilterButtonInTextField />
                    </div> */}
                  </div>
                ) : null}

                {/* {(location.pathname.includes("/scheduler/create_booking") ||
                  location.pathname.includes("/scheduler/create_event") ||
                  location.pathname.includes("/scheduler/create_break")) && (
                  <div>
                    <div
                      className="dropdown-container"
                      style={{
                        position: "relative",
                        display: "inline-block",
                        marginLeft: "30px",
                      }}
                    >
                      <div
                        className="dropdown-header"
                        style={{
                          borderRadius: "6px",
                          border: "1px solid #D7D7D7",
                          background: "#FFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "141px",
                          padding: "0",
                          cursor: "pointer", // Add cursor pointer
                        }}
                        onClick={toggleDropdown}
                      >
                        <span
                          style={{
                            color: "#585858",
                            fontFamily: "Inter",
                            fontSize: "12px",
                            fontStyle: "normal",
                            marginLeft: "10px",
                            fontWeight: 600,
                          }}
                        >
                          {location.pathname.includes(
                            "/scheduler/create_booking"
                          )
                            ? "Booking"
                            : location.pathname.includes(
                                "/scheduler/create_event"
                              )
                            ? "Event"
                            : location.pathname.includes(
                                "/scheduler/create_break"
                              )
                            ? "Break"
                            : ""}
                        </span>
                        <div
                          className={`dropdown-icon px-2 ${
                            isOpen ? "open" : ""
                          }`}
                          style={{
                            borderRadius: "0px 7px 7px 0px",
                            background: "#EBEBEB",
                            height: "24px",
                            display: "flex",
                            alignItems: "center",
                            transition: "transform 0.3s ease", // Add transition for smooth icon rotation
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            style={{
                              transform: isOpen
                                ? "rotate(180deg)"
                                : "rotate(0deg)", // Rotate icon based on dropdown state
                            }}
                          >
                            <path
                              d="M1 1L5.1569 5L9 1"
                              stroke="#707070"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      {isOpen && (
                        <ul
                          className="dropdown-options"
                          style={{
                            listStyle: "none",
                            padding: "0",
                            margin: "0",
                            position: "absolute",
                            minWidth: "140px",
                            top: "100%",
                            left: "0",
                            zIndex: "1",
                            border: "1px solid #D7D7D7",
                            marginTop: "5px",
                            borderRadius: "5px",
                            overflow: "hidden",
                            backgroundColor: "white",
                            // borderRadius: "8px",
                          }}
                        >
                          {options.map((option, index) => (
                            <li
                              key={index}
                              onMouseDown={() => handleOptionChange(option)}
                              style={{
                                marginTop: "5px",
                                marginBottom: "5px",
                                background:
                                  option === selectedOption
                                    ? "#FFD705"
                                    : "#FFF",
                                padding: "4px 9px",

                                cursor: "pointer",
                                userSelect: "none",
                              }}
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )} */}
              </div>
            </div>

            <div className={`${!isMobile ? "pt-2 " : ""}`}>
              <div className={`${!isMobile ? "flex_in_calendex_bar1" : ""}`}>
                <div className={`${!isMobile ? "px-2" : "pt-2 pe-2"}`}>
                  {location.pathname.includes("/our-faculty") ? (
                    permission === false ? null : (
                      <button
                        onClick={() => {
                          handleBusinesSelection();
                        }}
                        className="btn btn-warning button_styling px-4"
                      >
                        <img
                          className="img-fluid img_size_cal_menu"
                          src="/images/addcircle.png"
                          alt="no-data"
                        />{" "}
                        Add
                      </button>
                    )
                  ) : location.pathname.includes("/staff-profile-view/") ? (
                    <span>
                      {providerDatas?.providerId !== 0 ? (
                        <button
                          onClick={() => handleMoreOptionsClick()}
                          className="btn btn-warning button_styling px-3"
                        >
                          <img
                            className="img-fluid img_size_cal_menu2"
                            src="/images/calen.png"
                            alt="no-data"
                          />
                          &nbsp;&nbsp;<span className="pt-2"> Schedule</span>
                        </button>
                      ) : null}
                      <button
                        onClick={
                          () => customSnackBar("We are working on it")
                          // history.push(`/add-staff/${selectedBusines?.id}`)
                        }
                        className="btn btn-warning button_styling px-3 mx-2"
                      >
                        <img
                          className="img-fluid img_size_cal_menu2"
                          src="/images/cale.png"
                          alt="no-data"
                        />
                        &nbsp;&nbsp;<span className="pt-2"> Bookings</span>
                      </button>

                      <button
                        onClick={
                          () => customSnackBar("We are working on it")
                          // history.push(`/add-staff/${selectedBusines?.id}`)
                        }
                        className="btn btn-warning button_styling px-3 mx-2"
                      >
                        <img
                          className="img-fluid img_size_cal_menu2"
                          src="/images/msh.png"
                          alt="no-data"
                        />
                        &nbsp;&nbsp;<span className="pt-2"> Messages</span>
                      </button>
                      <button
                        onClick={
                          () => customSnackBar("We are working on it")
                          // history.push(`/add-staff/${selectedBusines?.id}`)
                        }
                        className="btn btn-warning button_styling px-3 mx-2"
                      >
                        <img
                          className="img-fluid img_size_cal_menu2"
                          src="/images/chat.png"
                          alt="no-data"
                        />
                        &nbsp;&nbsp;<span className="pt-2"> Services</span>
                      </button>
                    </span>
                  ) : location.pathname.includes("/team") ||
                    location.pathname.includes("/department") ||
                    location.pathname.includes("/business/") ||
                    location.pathname.includes("/users") ? (
                    <Button
                      sx={{
                        backgroundColor: "#538dff",
                        height: "30px",
                        borderRadius: isMobile ? "8px" : "4px",
                        textTransform: "capitalize",
                      }}
                      variant="contained"
                      onClick={() => {
                        const data = {
                          data: record,
                          actionState: "new",
                        };
                        history.push(link, { data });
                      }}
                    >
                      {!isMobile ? ` +  ${buttonText}` : "Add"}
                      {/* {isMobile ? "Add" : +  buttonText} */}
                    </Button>
                  ) : null}
                  {location.pathname.includes("/staff-list") &&
                    (permission === true ||
                    permission === null ||
                    permission === undefined ? (
                      <button
                        onClick={() => {
                          handleBusinesSelection();
                        }}
                        className="btn btn-warning button_styling px-4"
                      >
                        <img
                          className="img-fluid img_size_cal_menu"
                          src="/images/addcircle.png"
                          alt="no-data"
                        />{" "}
                        Add
                      </button>
                    ) : null)}
                </div>
                {(location.pathname.includes("/staff-list") ||
                  location.pathname.includes("/our-faculty")) &&
                  (permission === false ? null : (
                    <div className="" onClick={onClick}>
                      <Tooltip placement="bottom" title="Add Prefrence">
                        <img
                          className="img-fluid img_size_cal_menu"
                          src="/images/menu.png"
                          alt="no-data"
                        />
                      </Tooltip>
                    </div>
                  ))}
                {location.pathname.includes("/all-customer") &&
                  // (permission === false ? null : (
                  //   <div className="mt-2" onClick={handleClick}>
                  //     <Tooltip placement="bottom" title="Add Prefrence">
                  //       <img
                  //         className="img-fluid img_size_cal_menu"
                  //         src="/images/menu.png"
                  //         alt="no-data"
                  //       />
                  //     </Tooltip>
                  //   </div>
                  (permission === true ||
                  permission === null ||
                  permission === undefined ? (
                    <div className="d-flex align-items-center">
                      <div
                        onClick={(event) => handleMenuActionClick(event)}
                        style={{ cursor: "pointer" }}
                        className="ms-2"
                      >
                        <svg
                          width="21"
                          height="22"
                          viewBox="0 0 21 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.755 9.06792L12.095 6.28125V15.7229M6.25 12.9362L8.91 15.7229V6.28125"
                            stroke="#989898"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10.5 20.1654C15.3326 20.1654 19.25 16.0614 19.25 10.9987C19.25 5.93595 15.3326 1.83203 10.5 1.83203C5.66738 1.83203 1.75 5.93595 1.75 10.9987C1.75 16.0614 5.66738 20.1654 10.5 20.1654Z"
                            stroke="#989898"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="ms-2">
                        <svg
                          width="17"
                          height="20"
                          viewBox="0 0 17 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.58875 1L3.275 8.24167M2.75 1H14.3C15.2625 1 16.05 1.825 16.05 2.83333V4.85C16.05 5.58333 15.6125 6.5 15.175 6.95833L11.4125 10.4417C10.8875 10.9 10.5375 11.8167 10.5375 12.55V16.4917C10.5375 17.0417 10.1875 17.775 9.75 18.05L8.525 18.875C7.3875 19.6083 5.8125 18.7833 5.8125 17.3167V12.4583C5.8125 11.8167 5.4625 10.9917 5.1125 10.5333L1.7875 6.86667C1.35 6.40833 1 5.58333 1 5.03333V2.925C1 1.825 1.7875 1 2.75 1Z"
                            stroke="#989898"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      {openAction && (
                        <Menu
                          anchorEl={anchorEl}
                          //   open={open}
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                        >
                          <MenuItem
                            sx={{
                              fontSize: "12px",
                              color: "#A9A9A9",
                              lineHeight: "14px",
                            }}
                          >
                            <Box
                              sx={{
                                borderRedius: "6px",
                              }}
                              component="div"
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              Sort By
                            </Box>
                          </MenuItem>
                          <MenuItem
                            sx={{
                              fontSize: "16px",
                              color: "#4D4D4D",
                            }}
                          >
                            <Box
                              sx={{
                                borderRedius: "6px",
                                marginTop: "6px",
                              }}
                              component="div"
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              Alphabetical order
                            </Box>
                          </MenuItem>

                          <MenuItem
                            sx={{
                              fontSize: "16px",
                              color: "#4D4D4D",
                            }}
                          >
                            <Box
                              component="div"
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              {/* <EditOutlinedIcon fontSize="small" sx={{ marginRight: 1 }} /> */}
                              Last Name
                            </Box>
                          </MenuItem>
                        </Menu>
                      )}
                      <button
                        style={{ height: "30px" }}
                        onClick={() => {
                          dispatch(getFormData(selectedBusines?.id));
                          history.push("/view-page");
                        }}
                        className="btn d-flex ms-2 btn-warning button_styling px-4"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.9974 18.3346C14.5807 18.3346 18.3307 14.5846 18.3307 10.0013C18.3307 5.41797 14.5807 1.66797 9.9974 1.66797C5.41406 1.66797 1.66406 5.41797 1.66406 10.0013C1.66406 14.5846 5.41406 18.3346 9.9974 18.3346ZM6.66406 10.0013H13.3307H6.66406ZM9.9974 13.3346V6.66797V13.3346Z"
                            fill="white"
                          />
                          <path
                            d="M6.66406 10.0013H13.3307M9.9974 13.3346V6.66797M9.9974 18.3346C14.5807 18.3346 18.3307 14.5846 18.3307 10.0013C18.3307 5.41797 14.5807 1.66797 9.9974 1.66797C5.41406 1.66797 1.66406 5.41797 1.66406 10.0013C1.66406 14.5846 5.41406 18.3346 9.9974 18.3346Z"
                            stroke="#FFD705"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#553300",
                          }}
                        >
                          Add
                        </span>
                      </button>
                      <div className="ms-2" onClick={handleClick}>
                        <Tooltip placement="bottom" title="Add Prefrence">
                          <img
                            className="img-fluid img_size_cal_menu"
                            src="/images/menu.png"
                            alt="no-data"
                          />
                        </Tooltip>
                      </div>
                    </div>
                  ) : null)}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NavBarHeading;
