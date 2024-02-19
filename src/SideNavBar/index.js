import React, { useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import "./SideNav.scss";
import { useHistory } from "react-router-dom";
import SideBarItem from "./SideBarItem";
import SideBarHeader from "./SideBarHeader";
import NavBarHeading from "./NavBarHeading";
import SideNavBar from "./SideNavBar";
// import Setting from "../../public/images/settings.svg";

const SideNavone = ({
  children,
  data,
  rowData,
  record,
  setRowData,
  buttonText,
  link,
  OnSearch,
  businessPermission,
  onClick,
  handleClick,
}) => {
  // Get the current location using react-router-dom's useLocation hook
  const location = useLocation();
  const date = new Date();

  // Split the pathname by slashes to extract parts
  const firstSlashIndex = location.pathname;
  const parts = firstSlashIndex.split("/");

  // Retrieve user data from Redux state
  var alluserdata = useSelector((state) => state.Auth.alluserdataafterlogin);
  const selectedBusines = useSelector(
    (state) => state.Business?.selectedBusiness
  );

  // State for managing active link and sidebar expansion
  const [isActiveLink, setIsActiveLink] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [providerData, setProviderData] = useState();
  const [providerRecord, setProviderRecord] = useState("");

  // Function to handle mouse enter event
  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setIsExpanded(false);
  };
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Set a 1-second delay

    return () => clearTimeout(timeout);
  }, []);

  // Get the history object from react-router-dom
  const history = useHistory();

  // Extracted part from the pathname
  const extractedPart = parts[1];

  // Function to navigate back to the staff listing page
  const backtostafflising = () => {
    history.push("/staff-list");
  };

  let appointmentData = {};

  const handleMoreOptionsClick = async () => {
    const providerDatas = JSON.parse(localStorage.getItem("StaffRecord"));
    console.log(providerDatas, "providerDatasproviderDatas");
    appointmentData = {
      date: date,
      actionState: "new",
    };
    if (providerDatas?.providerId !== 0) {
      history.push(
        `/timeSlot?busiessId=${selectedBusines.id}&providerId=${providerDatas.providerId}`,
        { appointmentData }
      );
    } else {
      alert("Staff is not a Providr");
    }
    // try {
    //   const providerDatas = JSON.parse(localStorage.getItem("StaffRecord"))

    //   // Fetch provider data
    //   setLoading(true); // Show loading indicator

    //   const providerResponse = await axios.get(
    //     `${process.env.REACT_APP_BASE_URL}/provideravailability_svc/pb/get/provider/addedSchedule?providerId=${providerDatas.providerId}`
    //   );
    //   setProviderData(providerResponse.data.result);
    //   // setData(providerResponse.data.result.startDate);

    //     // Fetch schedules

    //     // Navigate to the scheduler view
    //     if (providerResponse.data.result.scheduler.length>0) {

    //       appointmentData = {
    //         date: date,
    //         data: providerResponse.data.result,
    //         actionState: "edit",
    //       };
    //       localStorage.setItem("providerData", JSON.stringify(providerDatas));

    //       history.push(
    //         `/timeSlot?busiessId=${selectedBusines.id}&providerId=${providerDatas.providerId}`,
    //         { appointmentData }
    //       );
    //     } else {
    //       // If provider data doesn't exist, navigate with the current date
    //       // history.push(
    //       //   `/timeSlot?busiessId=${businessId}&providerId=${providerDatas.providerId}`,
    //       //   { appointmentData }
    //       // );
    //       appointmentData = {
    //         date: date,
    //         actionState: "new",
    //       };
    //       localStorage.setItem("providerData", JSON.stringify(providerRecord));

    //       history.push(
    //         `/timeSlot?busiessId=${selectedBusines.id}&providerId=${providerDatas.providerId}`,
    //         { appointmentData }
    //       );
    //       error("Provider does'nt have Scheduler Please Add it");
    //             }

    //   setLoading(false); // Hide loading indicator
    // } catch (err) {
    //   setLoading(false); // Hide loading indicator in case of an error
    // }
  };

  return (
    <div className="bod_overflow">
      {/* Render the SideBarHeader component */}
      <SideBarHeader alluserdata={alluserdata} />

      {/* Render the NavBarHeading component */}
      <NavBarHeading
        backtostafflising={backtostafflising}
        selectedBusines={selectedBusines}
        handleMoreOptionsClick={handleMoreOptionsClick}
        OnSearch={OnSearch}
        rowData={rowData}
        data={data}
        record={record}
        setRowData={setRowData}
        buttonText={buttonText}
        link={link}
        businessPermission={businessPermission}
        onClick={onClick}
        handleClick={handleClick}
      />

      <div className="col-md-12 px-0 overflow_main_dashboard">
        {/* Render the SideNavBar component */}
        <SideNavBar extractedPart={extractedPart} />

        {/* Render the SideBarItem component */}
        <SideBarItem
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          isActiveLink={isActiveLink}
          isExpanded={isExpanded}
          location={location}
          setIsExpanded={setIsExpanded}
          setIsActiveLink={setIsActiveLink}
          children={children}
          isVisible={isVisible}
          extractedPart={extractedPart}
        />
      </div>
    </div>
  );
};

export default SideNavone;
