import React, { useContext, useState } from "react";
import { ErrorMessage, Formik } from "formik";
import "./style.scss";
import { IoArrowBackOutline } from "react-icons/io5";
import Day from "./day";
import Button from "@mui/material/Button";
import Week from "./RepeatedDay";
import { useNavigate, useLocation } from "react-router-dom";
import {
  postSchedule,
  postdateSchedule,
  updateSchedule,
} from "../../services/serviceProvider";
import InputDate from "../InputDate";
import { FormateDate, success, error } from "../../utils";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment";
import dayjs from "dayjs";
import { SelectedDateContext } from "../../context";
import {
  defaultItem,
  editFormatdata,
  formateData,
  formateRepeatData,
  initialValuesofSlot,
  timeSlotSchema,
  defaultItemDates,
} from "./helper";
import * as Yup from "yup";
import RepeatDate from "./RepeatedDate";
import RepeatedDay from "./RepeatedDay";

const TimeSlot = ({ route }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [states, setState] = useContext(SelectedDateContext);
  const [activeWeekOptions, setActiveWeekOptions] = useState([]);
  const [activeMonthOptions, setActiveMonthOptions] = useState([]);
  const [loading, setLoading] = React.useState(false);

  const date =
    (location.state && location.state.date && location.state.date.startDate) ||
    "";
  const editData = (location.state && location.state.appoinment) || "";
  const day = moment(date).day();
  const week = Math.ceil(moment(date).date() / 7);
  const month = Math.ceil(moment(date).month() + 1);
  const action = location.state.actionState;
  const [dates, setDate] = useState("");
  //handle the state of repeatedDay
  const handleChangeRepeatedDays = (repeatedDays, setFieldValue, values) => {
    // if()
    if (values.repeatedDates === true) {
      // setFieldValue("PrevScheduleItemDates", values.scheduleItems);
      // setFieldValue("PrevStartDateDates", values.startDate);
      // setFieldValue("PrevEndDateDates", values.endDate);
      setFieldValue("repeatedDates", !values.repeatedDates);
    }
    if (repeatedDays === true) {
      // setFieldValue("PrevScheduleItemDays", values.scheduleItems);
      // setFieldValue("PrevStartDateDays", values.startDate);
      // setFieldValue("PrevEndDateDays", values.endDate);
      const item = values.scheduleItems.find((slot) => slot.active);
      setFieldValue("scheduleItems", [item]);
      setFieldValue("startDate", item.date);
      setFieldValue("endDate", item.date);
      setFieldValue("repeatedDays", !repeatedDays);
    } else if (repeatedDays === false) {
      // setFieldValue("startDate", values.PrevStartDateDays);
      // setFieldValue("endDate", values.PrevEndDateDays);
      // setFieldValue("scheduleItems", values.PrevScheduleItemDays);
      setFieldValue("repeatedDays", !repeatedDays);
    } else {
      setFieldValue("repeatedDays", !repeatedDays);
    }
  };

  //handle the state of repeatedDates
  const handleChangeRepeatedDates = (repeatedDates, setFieldValue, values) => {
    if (values.repeatedDays === true) {
      // setFieldValue("PrevScheduleItemDays", values.scheduleItems);
      // setFieldValue("PrevStartDateDays", values.startDate);
      // setFieldValue("PrevEndDateDays", values.endDate);
      setFieldValue("repeatedDays", !values.repeatedDays);
    }
    if (repeatedDates === true) {
      // setFieldValue("PrevScheduleItemDates", values.scheduleItems);
      // setFieldValue("PrevStartDateDates", values.startDate);
      // setFieldValue("PrevEndDateDates", values.endDate);
      const item = values.scheduleItems.find((slot) => slot.active);
      setFieldValue("scheduleItems", [item]);
      setFieldValue("startDate", item.date);
      setFieldValue("endDate", item.date);
      setFieldValue("repeatedDates", !repeatedDates);
    } else if (repeatedDates === false) {
      // setFieldValue("startDate", values.PrevStartDateDates);
      // setFieldValue("endDate", values.PrevEndDateDates);
      // setFieldValue("scheduleItems", values.PrevScheduleItemDates);
      setFieldValue("repeatedDates", !repeatedDates);
    } else {
      setFieldValue("repeatedDates", !repeatedDates);
    }
  };

  //add timeSlot function
  const handleAddSlot = (setFieldValue, scheduleItems) => {
    const lastSlot = scheduleItems[scheduleItems.length - 1];
    const newSlotDate = new Date(lastSlot.date);
    newSlotDate.setDate(newSlotDate.getDate() + 1);

    const newSlot = {
      date: newSlotDate,
      day: moment(newSlotDate).day(),
      startTime: "",
      endTime: "",
    };

    setFieldValue("scheduleItems", [...scheduleItems, newSlot]);
  };

  //delete timeSlot function
  const handleDeleteSlot = (setFieldValue, scheduleItems, index) => {
    setFieldValue(
      "scheduleItems",
      scheduleItems.filter((slot, i) => i !== index)
    );
  };
  //CustomeValidation
  const validateForm = (values) => {
    let errors = {};

    values.scheduleItems.forEach((data, index) => {
      const { active, startTime, endTime } = data;

      if (active) {
        if (startTime == "") {
          if (!errors.scheduleItems) {
            errors.scheduleItems = [];
          }
          errors.scheduleItems[index] = { startTime: "Start Time is Required" };
        } else {
          // Clear the error message if startTime is filled
          if (errors.scheduleItems && errors.scheduleItems[index]) {
            delete errors.scheduleItems[index].startTime;
          }
        }

        if (endTime == "") {
          if (!errors.scheduleItems) {
            errors.scheduleItems = [];
          }
          errors.scheduleItems[index] = {
            ...errors.scheduleItems[index],
            endTime: "End Time is Required",
          };
        } else {
          // Clear the error message if endTime is filled
          if (errors.scheduleItems && errors.scheduleItems[index]) {
            delete errors.scheduleItems[index].endTime;
          }
        }
      }
    });

    if (!values.endDate) {
      errors.endDate = "End Date is required";
    } else {
      // Clear the error message if endDate is filled
      delete errors.endDate;
    }

    // Add more validation rules for other fields

    return errors;
  };

  //timeslot creation
  const createSlot = (values, handles) => {
    setLoading(true);
    const data = formateData(values);
    const jsonData = JSON.stringify(data);
    postSchedule(jsonData).then((res) => {
      setLoading(false);
      if (res.statusCode === 0) {
        success(res.message);
        setState([...states, values]);

        navigate("../");
        handles.resetForm();
      } else {
        error(res.message);
        handles.setValues(initialValuesofSlot());
      }
    });
  };
  //create repeatDate
  const createRepeatDate = (values, handles) => {
    setLoading(true);
    const data = formateRepeatData(values);
    const jsonData = JSON.stringify(data);
    postdateSchedule(jsonData).then((res) => {
      setLoading(false);
      if (res.statusCode === 0) {
        success(res.message);
        setState([...states, values]);

        navigate("../");
        handles.resetForm();
      } else {
        error(res.message);
        handles.setValues(initialValuesofSlot());
      }
    });
  };

  //timeslot updation
  const updateSlot = (values, handles) => {
    setLoading(true);
    const data = editFormatdata(values);
    const jsonData = JSON.stringify(data);
    updateSchedule(jsonData).then((res) => {
      setLoading(false);
      if (res.statusCode === 0) {
        success(res.message);
        setState(
          states.map((slots) =>
            slots && slots.providerId === values.providerId ? values : slots
          )
        );
        navigate("../");
        handles.resetForm();
      } else {
        error(res.message);
        handles.resetForm();
      }
    });
  };

  //function handle the submission form
  const handleSubmit = (values, handles) => {
    const errors = validateForm(values);
    if (Object.keys(errors).length > 0) {
      console.log("Form has errors:", errors);
    } else {
      if (action === "edit") {
        updateSlot(values, handles);
      } else if (action === "new" && values.repeatedDays === true) {
        createSlot(values, handles);
      } else {
        createRepeatDate(values, handles);
      }
    }
  };

  //repeateday functionailty
  const handleUpdateTimeSlots = (
    startDate,
    endDate,
    values,
    setFieldValue,
    errors
  ) => {
    const items = [];
    const prevItems = [];
    const days = [];
    values.scheduleItems &&
      values.scheduleItems.length > 0 &&
      values.scheduleItems.map((item) => {
        if (item && item.active && item.day && !days.includes(item.day)) {
          prevItems.push(item);
          days.push(item.day);
        }
        return item;
      });

    for (
      let currDate = startDate;
      currDate.isBefore(endDate);
      currDate = currDate.add(1, "day")
    ) {
      let currDay = dayjs(currDate).day();
      let currWeek = Math.ceil(dayjs(currDate).date() / 7);
      let currMonth = dayjs(currDate).month() + 1;
      if (days.includes(currDay)) {
        let currItem = prevItems.find((item) => item.day === currDay);
        items.push({
          ...currItem,
          date: currDate,
          week: currWeek,
          month: currMonth,
          active: true,
        });
      } else {
        const item = defaultItem(currDay, currWeek, currDate, currMonth);
        items.push({
          ...item,
          date: currDate,
          week: currWeek,
          day: currDay,
          month: currMonth,
          active: false,
        });
      }
    }
    setFieldValue("scheduleItems", items);
  };

  //repeatedates functionailty
  const handleUpdateDatesTimeSlots = (
    startDate,
    endDate,
    values,
    setFieldValue,
    errors
  ) => {
    const items = [];
    const prevItems =
      values.scheduleItems && values.scheduleItems.length > 0
        ? values.scheduleItems
        : [];

    for (
      let currDate = startDate;
      currDate.isBefore(endDate);
      currDate = currDate.add(1, "day")
    ) {
      let currDayOfMonth = dayjs(currDate).date();
      let currMonth = dayjs(currDate).month() + 1;

      let currItem = prevItems.find(
        (item) => currDayOfMonth === dayjs(item.date).date()
      );
      if (currItem) {
        items.push({
          ...currItem,
          date: currDate,
          month: currMonth,
        });
      } else {
        const item = defaultItemDates(currDate, currMonth);
        items.push({
          ...item,
          date: currDate,
          month: currMonth,
          active: false,
        });
      }
    }
    setFieldValue("scheduleItems", items);
  };

  return (
    <div className="wrapper">
      <div className="arrows">
        <IoArrowBackOutline
          onClick={() => {
            navigate("../", { replace: true });
          }}
          style={{
            color: "#548dff",
            fontSize: 25,
            margin: "20px",
            cursor: "pointer",
          }}
        />
        <div className="card px-3 py-2  min-h-[250px] card-cont">
          <div className="card-header position-relative d-flex align-items-center">
            <span className="text ">Time Slots</span>
            {action === "edit" ? (
              <>
                <div className="text2">
                  <span className="spanDate">
                    {moment(editData.day).format("dddd")}
                  </span>
                  <span className="date text-primary">
                    ,{moment(editData.day).format("DD MMM")}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="text2">
                  <span className="spanDate">
                    {moment(date).format("dddd")}
                  </span>
                  <span className="date text-primary">
                    ,{moment(date).format("DD MMM")}
                  </span>
                </div>
              </>
            )}
          </div>
          <Formik
            initialValues={initialValuesofSlot(
              action,
              editData,
              location,
              date,
              day,
              week,
              month
            )}
            // onSubmit={handleSubmit}
            onSubmit={(values, handles) => {
              handleSubmit(values, handles);
            }}
            validate={validateForm}
            // validationSchema={timeSlotSchema}
          >
            {(options) => {
              const {
                touched,
                values,
                errors,
                setFieldValue,
                handleChange,
                handleSubmit,
                setErrors,
                prevScheduleItems,
              } = options;
              return (
                <form onSubmit={handleSubmit} className="form">
                  <div className="card-body  card-body-cont">
                    <div className="check-box">
                      <div className="checkboxs">
                        <label
                          style={{
                            fontSize: "12px",

                            display: "flex",
                            flexDirection: "row",
                            marginTop: "25px",
                          }}
                        >
                          <input
                            type="checkbox"
                            value={values.repeatedDays}
                            checked={values.repeatedDays}
                            // checked={selectedDays.includes(weekday)}
                            onChange={(e) =>
                              handleChangeRepeatedDays(
                                values.repeatedDays,
                                setFieldValue,
                                values
                              )
                            }
                            // disabled={weekday === "Sunday"}
                            style={{
                              marginBottom: "20px",
                              marginRight: "10px",
                              marginTop: "3px",
                            }}
                          />
                          <p className="spanText">Repeated Day</p>
                        </label>
                      </div>
                      <div className="checkboxs">
                        <label
                          style={{
                            fontSize: "12px",
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "25px",
                          }}
                        >
                          <input
                            type="checkbox"
                            value={values.repeatedDates}
                            checked={values.repeatedDates}
                            // checked={selectedDays.includes(weekday)}
                            onChange={(e) =>
                              handleChangeRepeatedDates(
                                values.repeatedDates,
                                setFieldValue,
                                values
                              )
                            }
                            // disabled={weekday === "Sunday"}
                            style={{
                              marginBottom: "20px",
                              marginRight: "10px",
                              marginTop: "3px",
                            }}
                          />
                          <p className="spanText">Repeated Date</p>
                        </label>
                      </div>
                    </div>
                    {!values.repeatedDays && !values.repeatedDates ? (
                      <Day
                        setErrors={setErrors}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        values={values}
                        touched={touched}
                        date={date}
                        editData={editData}
                        errors={errors}
                        onSubmit={handleSubmit}
                        handleAddSlot={handleAddSlot}
                        handleDeleteSlot={handleDeleteSlot}
                      />
                    ) : values.repeatedDays && !values.repeatedDates ? (
                      <RepeatedDay
                        setErrors={setErrors}
                        activeWeekOptions={activeWeekOptions}
                        setActiveWeekOptions={setActiveWeekOptions}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        values={values}
                        touched={touched}
                        errors={errors}
                        onSubmit={handleSubmit}
                      />
                    ) : !values.repeatedDays && values.repeatedDates ? (
                      <RepeatDate
                        setErrors={setErrors}
                        prevScheduleItems={prevScheduleItems}
                        activeMonthOptions={activeMonthOptions}
                        setActiveMonthOptions={setActiveMonthOptions}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        values={values}
                        touched={touched}
                        errors={errors}
                        onSubmit={handleSubmit}
                      />
                    ) : null}
                  </div>

                  <div className="card-footer">
                    <div className="justify-content-between pt-2 d-flex flex-wrap">
                      {(values.repeatedDays || values.repeatedDates) && (
                        <div className="d-flex flex-wrap ">
                          <div className="pe-3">
                            <InputDate
                              id="start-date"
                              label="Start date"
                              name="startDate"
                              minDate={dayjs(values.startDate).startOf("month")}
                              maxDate={dayjs(values.endDate)}
                              value={dayjs(values.startDate)}
                              sx={{
                                width: 180,
                                backgroundColor: "hwb(187 78% 5%)",
                              }}
                              defaultValue={new Date()}
                              helperText={touched.startDate && errors.startDate}
                              onChange={(newValue) => {
                                !values.repeatedDates
                                  ? handleUpdateTimeSlots(
                                      newValue,
                                      dayjs(values.endDate),
                                      values,
                                      setFieldValue,
                                      errors
                                    )
                                  : handleUpdateDatesTimeSlots(
                                      newValue,
                                      dayjs(values.endDate),
                                      values,
                                      setFieldValue,
                                      errors
                                    );
                                setFieldValue(
                                  "startDate",
                                  FormateDate(newValue)
                                );
                              }}
                            />
                            {<p className="form-error">{errors.startDate}</p>}
                          </div>
                          <div className="mr-4">
                            <InputDate
                              id="end-date"
                              label="End date"
                              name="endDate"
                              minDate={dayjs(values.startDate)}
                              maxDate={
                                !values.repeatedDates
                                  ? dayjs(values.startDate).endOf("month")
                                  : dayjs(values.startDate).endOf("year")
                              }
                              value={dayjs(values.endDate)}
                              helperText={touched.endDate && errors.endDate}
                              sx={{
                                width: 180,
                                backgroundColor: "hwb(187 78% 5%)",
                              }}
                              onChange={(newValue) => {
                                !values.repeatedDates
                                  ? handleUpdateTimeSlots(
                                      dayjs(values.startDate),
                                      newValue,
                                      values,
                                      setFieldValue,
                                      errors
                                    )
                                  : handleUpdateDatesTimeSlots(
                                      dayjs(values.startDate),
                                      newValue,
                                      values,
                                      setFieldValue,
                                      errors
                                    );
                                setFieldValue("endDate", FormateDate(newValue));
                              }}
                            />
                            <ErrorMessage name="endDate" component="div" />

                            {/* {<p className="form-error">{errors.endDate}</p>} */}
                          </div>
                        </div>
                      )}
                      <div className="buttons">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          {loading ? (
                            <ClipLoader color="#fffff" size={30} />
                          ) : action === "edit" ? (
                            "UPDATE"
                          ) : (
                            "SAVE"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TimeSlot;
