import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Scheduler, Editing } from "devextreme-react/scheduler";
import { deleteSchedule, getSchedule } from "../../services/serviceProvider.js";
import { success, error } from "../../utils";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import Button from "@mui/material/Button";
import { FormateDate } from "../../utils";
import "./style.scss";
import { SelectedDateContext } from "../../context";
import moment from "moment/moment.js";
import dayjs from "dayjs";
import DialogBox from "../ConfirmationPopUp/index.js";
import { formateData } from "./helper.js";

const currentDate = new Date();
const views = ["month"];

const Calendar = ({ props }) => {
  const navigate = useNavigate();
  const [state, setState] = useContext(SelectedDateContext);
  const [dialog, setDialog] = useState({ visible: false });
  const filteredArray = state.filter((element) => element !== null); //filter out the null array

  //Appoointment Data
  const mapData = filteredArray.map((data, index) => ({
    text: "Booked Slot",
    day: (data && data.day) || dayjs(),
    startDate:
      (data && FormateDate(data.startDate)) ||
      new Date("2021-03-29T20:00:00.000Z"),
    endDate:
      (data && FormateDate(data.endDate)) ||
      new Date("2021-03-29T20:00:00.000Z"),
    scheduleItems: formateData(data),
    id: (data && data.providerId) || "",
    allDay: true,
    repeatedDays: data.repeatedDays,
    repeatedDates: data.repeatedDates,
    // repeatedDays: Boolean(data.scheduleItems && data.scheduleItems.length > 0),
  }));

  const onAppointmentFormOpening = (e) => {
    e.cancel = true; // Cancel the default popup
  };
  //remove record and update the array
  const removeRecord = (idToRemove) => {
    const newArray = state.filter(
      (item, index) =>
        item &&
        item.providerId &&
        idToRemove &&
        idToRemove.providerId &&
        item.providerId !== idToRemove.providerId
    );
    setState(newArray);
  };

  //hadle calender cell click
  const handleOnCellClick = (e) => {
    const appointmentData = {
      date: e.cellData,
      actionState: "new",
    };
    navigate("/timeSlot", { state: appointmentData });
  };

  //fetch providerRecords
  const getSchedules = (d) => {
    const promises = state
      .filter((element) => element !== null)
      .map((item) => {
        const servicesData = {
          providerId: [item && item.providerId] ? [item.providerId] : [],
          startDate: (item && item.startDate) || "",
          endDate: (item && item.endDate) || "",
        };

        return getSchedule(servicesData)
          .then((res) => {
            if (res.statusCode === 0) {
              return res;
            } else {
              throw new Error(res.message);
            }
          })
          .catch((err) => {
            console.error(err);
            throw new Error("An error occurred.");
          });
      });
    Promise.all(promises)
      .then((results) => {
        // Handle the collected results
      })
      .catch((err) => {
        console.error(err);
        error("An error occurred while fetching data.");
      });
  };
  useEffect(() => {
    getSchedules();
  }, []);
  //function for custome tooltip of appointment
  const CustomTooltip = (appointment) => {
    const handleUpdate = (e) => {
      const appointmentData = {
        appoinment: appointment.appointmentData,
        actionState: "edit",
      };
      navigate("/timeSlot", { state: appointmentData });
    };
    const handleDeleteAppointment = (id) => {
      deleteSchedule(id)
        .then((res) => {
          if (res.statusCode === 0) {
            success(res.message);
            removeRecord(id);
          } else {
            error(res.message);
          }
        })
        .catch((err) => {
          err("error");
        });
    };
    //Delete slot Confirmation Dialouge Box handler

    const handleSlotDeleteConfirmation = () => {
      let servicesData = {
        providerId:
          appointment &&
          appointment.appointmentData &&
          appointment.appointmentData.id
            ? appointment.appointmentData.id
            : 12,
      };
      setDialog({
        visible: true,
        key: Math.random().toString(36).substring(7),
        ok: () => handleDeleteAppointment(servicesData),
      });
    };
    return (
      <div>
        <div className="d-flex justify-content-between m-2">
          <div className="d-flex">
            <div className="round-circle mt-2 me-2" />
            <div className=" span2 mt-4 m-3">
              {appointment &&
                appointment.appointmentData &&
                moment(appointment.appointmentData.startDate).format(
                  "MMMM D YYYY"
                )}
            </div>
          </div>

          <div className="d-flex justify-content-end mb-3 me-3">
            <div className="edit me-2">
              <Button variant="text" onClick={handleUpdate}>
                <AiTwotoneEdit style={{ color: "#649ae0", fontSize: 20 }} />
              </Button>
            </div>
            <div className="show-more-button">
              <Button
                variant="text"
                onClick={() => {
                  handleSlotDeleteConfirmation();
                }}
              >
                <AiFillDelete style={{ color: "red", fontSize: 20 }} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="calendar mb-5 p-3">
      <DialogBox
        {...dialog}
        header={"Delete Time Slot"}
        message={"Are you sure that you want to DELETE this Slot"}
      />
      <Scheduler
        // timeZone="America/Los_Angeles"
        dataSource={mapData}
        views={views}
        recurrenceEditMode="occurrence"
        onCellClick={handleOnCellClick}
        defaultCurrentView="month"
        defaultCurrentDate={currentDate}
        height={700}
        onAppointmentFormOpening={onAppointmentFormOpening}
        appointmentTooltips={true}
        appointmentTooltipRender={CustomTooltip}
        onAppointmentTooltipShowing={false}
        appointmentClick={(e) => {
          e.cancel = true;
        }}
        isButtonClicked={false}
        cancel={true}
        visible={true}
        startDayHour={9}
        endDayHour={19}
        remoteFiltering={true}
        dateSerializationFormat="yyyy-MM-ddTHH:mm:ssZ"
        textExpr="Text"
        min={currentDate}
        startDateExpr="StartDate"
        endDateExpr="EndDate"
        allDayExpr="AllDay"
      >
        <Editing
          allowTimeZoneEditing={true}
          allowUpdating={false}
          allowDeleting={true}
          allowAdding={false}
        />
      </Scheduler>
    </div>
  );
};

export default Calendar;
