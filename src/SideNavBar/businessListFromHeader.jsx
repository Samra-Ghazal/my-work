import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
// import { addSelectedBusiness } from "../Store/Business/actions";
import "./SideNav.scss";
import { useHistory } from "react-router-dom";
// import { permissionModule } from "../Store/Auth/actions";

const BusinessListFromHeader = () => {
  const selectedBusiness = useSelector(
    (state) => state.Business?.selectedBusiness
  );
  var userID = useSelector(
    (state) => state.Auth?.userloginsuccessyasir?.users?.id
  );
  var permission = useSelector((state) => state.Auth?.permissionsModule);
  // const [selectedBusiness, setSelectedBusiness] = useState(selectedBusines);
  const [isLoading, setIsLoading] = useState(false);
  // const [businessesList, setBusinessesList] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchedBusiness, setSearchedBusiness] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const businessList = useSelector((state) => state.Business.data);
  const getdataofregistereduser = useSelector(
    (state) => state.Auth?.alluserdataafterlogin
  );
  // useEffect(() => {
  //   const fetchBusiness = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_BASE_URL}/business_svc/pb/business/?userId=${userID}`
  //       );
  //       if (response?.data?.code === 0) {
  //         setBusinessesList(response?.data?.result);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchBusiness();
  // }, [userID]);
  // Add a useEffect to automatically select the first business when the component mounts
  const handleSelectedBusiness = useCallback();
  // (business) => {
  //   // dispatch(resetdate());
  //   if (businessList.length === 0) {
  //     dispatch(addSelectedBusiness(null));
  //   } else {
  //     dispatch(addSelectedBusiness(business));
  //   }
  //   setShowDropDown(false);
  // },
  // [businessList, dispatch]

  // useEffect(() => {
  //   if (businessList.length > 0 && selectedBusiness === null) {
  //     handleSelectedBusiness(businessList[0]);
  //     dispatch(
  //       permissionModule({
  //         userID,
  //         businessID: businessList[0].id, // Assuming there's a property called 'id' in your business object
  //       })
  //     );
  //   }
  // }, [
  //   businessList,
  //   selectedBusiness,
  //   handleSelectedBusiness,
  //   dispatch,
  //   userID,
  // ]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
      setIsTablet(window.innerWidth >= 600 && window.innerWidth <= 1200);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dropDownStyles = {
    position: "absolute",
    top: "35px",
    right: isMobile ? "-50px" : "-75px",
    zIndex: 10000000000000,
    height: "95.8vh",
    width: isMobile ? "101vw" : isTablet ? "51vw" : "24vw",
    overflow: "auto",
    backgroundColor: "white",
    borderRadius: 0,
  };

  const listTile = (busines) => {
    const isBusinessSelected = busines?.id === selectedBusiness?.id;
    const handleTileClick = () => {
      if (!isBusinessSelected) {
        handleSelectedBusiness(busines);
      }
    };

    return (
      <div
        className="d-flex justify-content-between align-items-center"
        role="button"
        style={{
          backgroundColor:
            busines?.id === selectedBusiness?.id ? "#E0EDFF" : "white",
          paddingRight: "15px",
        }}
        onClick={handleTileClick}
      >
        <div
          className="py-2 px-3"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {busines?.imageUrl !== "" || busines?.imageUrl !== null ? (
            <Avatar
              sx={{
                width: "50",
                // height: "3%",
                marginRight: "0.4em",
              }}
              // src={`${process.env.REACT_APP_IMAGE_URL}/Business/${busines?.id}_0.jpeg`}

              src={busines?.imageUrl}
            />
          ) : (
            <Avatar
              className="rounded-circle"
              sx={{
                width: "50",
                // height: "2vw",
                marginRight: "0.4rem",
              }}
            >
              {busines?.name?.charAt(0)}
            </Avatar>
          )}
          <div
            className="d-flex flex-column justify-content-center  ps-2"
            style={{
              width: "256px !important",
            }}
          >
            <p
              // className="ellipsis"
              style={{
                color: "#000",
                fontSize: "0.8em",
                fontStyle: "normal",
                fontWeight: 500,
                padding: "0",
                margin: 0,
                // lineHeight: "0.9em",
              }}
            >
              {busines?.name}
            </p>
            <p
              // className="ellipsis"
              style={{
                color: "#838383",
                fontSize: "0.6em",
                fontStyle: "normal",
                fontWeight: 400,
                // lineHeight: "0em",
                padding: 0,
                margin: 0,
              }}
            >
              {busines?.designation}
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center">
          {busines?.default && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12.2584 16.8419L12 16.686L11.7416 16.8419L6.57422 19.9608L7.93708 14.0829L8.00507 13.7897L7.77773 13.5924L3.21987 9.63666L9.23296 9.11815L9.5327 9.0923L9.65025 8.81536L12 3.27966L14.3497 8.81536L14.4673 9.0923L14.767 9.11815L20.7786 9.63654L16.2126 13.5921L15.9845 13.7897L16.0531 14.0836L17.4239 19.9596L12.2584 16.8419Z"
                fill="#FFB800"
                stroke="#B06A00"
              />
            </svg>
          )}
          <BsThreeDotsVertical />
        </div>
      </div>
    );
  };

  const renderDropDown = () => {
    return (
      <div className={`dropdown-menu d-block py-2 px-3`} style={dropDownStyles}>
        <div
          style={{
            height: "89%",
            border: "0.063rem solid #5599FF",
            borderRadius: "0.938rem",
          }}
        >
          <div
            style={{
              height: "10%",
              backgroundColor: "#5599FF",
              borderRadius: "0.938rem",
              position: "relative",
              display: isMobile ? "none" : "flex",
              alignItems: "center",
            }}
          >
            <div className="ms-4">
              {getdataofregistereduser &&
              (getdataofregistereduser?.imageURL === "" ||
                getdataofregistereduser?.imageURL === null) ? (
                <Avatar
                  style={{ width: 40, height: 40, border: "1px solid white" }}
                />
              ) : (
                <Avatar
                  className="img-fluid"
                  alt="idk"
                  style={{
                    height: "40px",
                    width: "40px",
                    border: "1px solid white",
                  }}
                  src={`https://1864597015.rsc.cdn77.org/consentformattachments/images/staging/${getdataofregistereduser?.imageURL}`}
                />
              )}
            </div>
            <div className="d-flex flex-column ms-3">
              <span
                style={{
                  color: "#FFF",
                  fontSize: "1em",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                {getdataofregistereduser?.firstName}{" "}
                {getdataofregistereduser?.lastName}
              </span>
              <span
                style={{
                  color: "#FFF",
                  fontSize: "0.7em",
                  fontStyle: "normal",
                  fontWeight: 300,
                  lineHeight: "normal",
                }}
              >
                {getdataofregistereduser?.businessRoleName}
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                cursor: "pointer",
              }}
              role="button"
              onClick={() => setShowDropDown(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="34"
                viewBox="0 0 38 34"
                fill="none"
              >
                <path
                  d="M26 11.41L24.59 10L19 15.59L13.41 10L12 11.41L17.59 17L12 22.59L13.41 24L19 18.41L24.59 24L26 22.59L20.41 17L26 11.41Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div
            style={{
              padding: "3.6% 0",
            }}
          >
            <div
              style={{
                border: "0.063rem solid #59F",
                backgroundColor: "#FFFFFF",
                borderRadius: "0.375rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "0 4.12% 0 4.12%",
                padding: "0 0.188rem 0 0.75rem",
              }}
            >
              <input
                style={{
                  border: "none",
                  fontSize: "0.625rem",
                  color: "#AAA",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "1.8rem",
                }}
                placeholder="Search Your Business"
                type="text"
                value={searchedBusiness}
                onChange={(e) => setSearchedBusiness(e.target.value)}
              />
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    width="23.4238"
                    height="23.4238"
                    rx="6"
                    fill="#5599FF"
                  />
                  <path
                    d="M18.2164 8.4728H14.3124M7.80577 8.4728H5.20312M18.2164 15.471H15.6137M9.1071 15.471H5.20312M10.4084 10.6995C10.7075 10.6995 11.0036 10.6419 11.2799 10.53C11.5562 10.4181 11.8073 10.2541 12.0187 10.0473C12.2302 9.84056 12.3979 9.59509 12.5124 9.32493C12.6268 9.05477 12.6857 8.76522 12.6857 8.4728C12.6857 8.18039 12.6268 7.89084 12.5124 7.62068C12.3979 7.35052 12.2302 7.10505 12.0187 6.89828C11.8073 6.69151 11.5562 6.52749 11.2799 6.41559C11.0036 6.30369 10.7075 6.24609 10.4084 6.24609C9.80444 6.24609 9.22519 6.48069 8.79811 6.89828C8.37103 7.31587 8.1311 7.88224 8.1311 8.4728C8.1311 9.06336 8.37103 9.62974 8.79811 10.0473C9.22519 10.4649 9.80444 10.6995 10.4084 10.6995ZM13.0111 17.6977C13.615 17.6977 14.1943 17.4631 14.6214 17.0456C15.0485 16.628 15.2884 16.0616 15.2884 15.471C15.2884 14.8805 15.0485 14.3141 14.6214 13.8965C14.1943 13.4789 13.615 13.2443 13.0111 13.2443C12.4071 13.2443 11.8278 13.4789 11.4008 13.8965C10.9737 14.3141 10.7338 14.8805 10.7338 15.471C10.7338 16.0616 10.9737 16.628 11.4008 17.0456C11.8278 17.4631 12.4071 17.6977 13.0111 17.6977Z"
                    stroke="white"
                    strokeWidth="1.3"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div
              style={{
                margin: "4% 0 0 0",
                overflow: "auto",
                height: "62vh",
              }}
            >
              {isLoading ? (
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <>
                  {searchedBusiness === "" &&
                    businessList.map((busines, index) => {
                      return <div key={index}>{listTile(busines)}</div>;
                    })}
                  {searchedBusiness !== "" &&
                    businessList
                      .filter((value) =>
                        value.name?.toLowerCase().includes(searchedBusiness)
                      )
                      .map((value, i) => {
                        return <div key={i}>{listTile(value)}</div>;
                      })}
                </>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            border: "0.063rem solid #D9DEEC",
            borderRadius: "0.938rem",
            marginTop: "2.6%",
            height: "4.9%",
            display: "flex",
            alignItems: "center",
            padding: "1.5rem 1.25rem ",
          }}
          onClick={() => {
            setShowDropDown(false);
            history.push("/add-new-business");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="27"
            viewBox="0 0 26 27"
            fill="none"
          >
            <path
              d="M9.53365 24.2876H15.8906C21.1881 24.2876 23.3071 22.1686 23.3071 16.8711V10.5141C23.3071 5.21665 21.1881 3.09766 15.8906 3.09766H9.53365C4.23618 3.09766 2.11719 5.21665 2.11719 10.5141V16.8711C2.11719 22.1686 4.23618 24.2876 9.53365 24.2876Z"
              fill="#5599FF"
              stroke="#5599FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.47656 13.6931H16.9525M12.7145 17.931V9.45508"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="ms-3"
            style={{
              color: "#000",
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "1.8rem",
            }}
          >
            Add New Business
          </span>
        </div>
      </div>
    );
  };
  return (
    <>
      <div
        style={{
          position: "relative",
          display: isMobile ? "none" : "flex",
          alignItems: "center",
        }}
        role="button"
      >
        <div className="d-flex" onClick={() => setShowDropDown(!showDropDown)}>
          <div className="">
            {selectedBusiness?.imageUrl !== "" ||
            selectedBusiness?.imageUrl !== null ? (
              <Avatar
                style={{
                  height: "30px",
                  width: "30px",
                  border: "1px solid white",
                  borderRadius: "10px",
                }}
                sx={{
                  width: "50",
                  // height: "3%",
                  marginRight: "0.4em",
                }}
                // src={`${process.env.REACT_APP_IMAGE_URL}/Business/${selectedBusiness?.id}_0.jpeg`}

                src={selectedBusiness?.imageUrl}
              />
            ) : (
              <Avatar
                className="rounded-circle"
                style={{ width: 30, height: 30 }}
                sx={{
                  width: "50",
                  // height: "2vw",
                  marginRight: "0.4rem",
                }}
              >
                {selectedBusiness?.name?.charAt(0)}
              </Avatar>
            )}
            {/* <Avatar style={{ width: 30, height: 30 }}
                  src={`https://1864597015.rsc.cdn77.org/consentformattachments/images/staging/${getdataofregistereduser?.imageURL}`}
                  >B</Avatar> */}
          </div>
          &nbsp; &nbsp;
          <div className="pe-3">
            <div className="d-flex flex-column">
              <span className="business_role ellipsis">
                {selectedBusiness !== null
                  ? selectedBusiness?.designation
                  : "No Role Found"}
              </span>
              <span className="business_profile ellipsis">
                {selectedBusiness !== null
                  ? selectedBusiness?.name
                  : "No Business Selected"}
              </span>
            </div>
          </div>
        </div>
        {showDropDown && renderDropDown()}
      </div>
      <div className="vl mt-md-0 me-md-4 pb-1" />
    </>
  );
};
export default BusinessListFromHeader;
