import React, { useState, useEffect } from "react";
import "./style.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Autocomplete from "@mui/material/Autocomplete";

import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Times from "./Times";
import dayjs from "dayjs";
import { weekOptions } from "./helper";

const RepeatedDay = (props) => {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    activeWeekOptions,
    setActiveWeekOptions,
    setError,
  } = props;
  const [isAllView, setIsAllView] = useState(false);
  const [activeWeek, setActiveWeek] = useState(false);

  useEffect(() => {
    if (values && values.startDate && values.endDate) {
      const startWeek = Math.ceil(dayjs(values.startDate).date() / 7);
      const endWeek = Math.ceil(dayjs(values.endDate).date() / 7);
      setActiveWeekOptions(
        weekOptions.filter((week) => week.id >= startWeek && week.id <= endWeek)
      );
    }
  }, [values.startDate, values.endDate]);

  const handleChangeActiveWeek = (event, value) => {
    setActiveWeek((value && value.id) || null);
  };

  const handleShowLessOrMore = () => {
    setIsAllView((prev) => !prev);
  };

  const handleSelectUnSelectSlot = (index, slot, setFieldValue) => {
    const selectedWeek = activeWeek || slot.week;

    const currentSlot = values.scheduleItems.find(
      (slot) => slot.week === selectedWeek || slot.active === true
    );
    setFieldValue(`scheduleItems.${index}`, {
      ...slot,
      startTime: slot.active === true ? [""] : currentSlot.startTime,
      endTime: slot.active === true ? [""] : currentSlot.endTime,
      active: slot.active === true ? slot.active === false : !slot.active,
    });
  };

  return (
    <div>
      <div>
        <div className="autocomplete">
          <Autocomplete
            disablePortal
            options={activeWeekOptions}
            // defaultValue={{ label: "Week", value: "week1" }}
            getOptionLabel={(option) => option.label}
            onChange={handleChangeActiveWeek}
            sx={{
              ".css-5bvyjh-MuiInputBase-root-MuiOutlinedInput-root": {
                height: "40px",
              },
              width: 250,
              " .css-a5xs0d-MuiFormLabel-root-MuiInputLabel-root": {
                marginTop: "-7px",
                fontSize: " 14px",
              },
              ".MuiAutocomplete-input ": {
                padding: "7.5px 4px 10px 6px",
                fontSize: "14px",
                marginTop: "-7px",
              },
            }}
            renderInput={(params) => (
              <TextField {...params} label="Repeat every" />
            )}
          />
        </div>
      </div>

      {/* show all active repeated days with checkboxes and time slotes */}
      <div className="scroll-container">
        {values.scheduleItems.map((slot, index) => (
          <div key={index}>
            <div
              className={` ${
                activeWeek
                  ? activeWeek === slot.week &&
                    ((!isAllView && slot.active) || isAllView)
                    ? "d-flex"
                    : "d-none"
                  : !isAllView && !slot.active
                  ? "d-none"
                  : "d-flex"
              }`}
            >
              <div className="d-flex">
                <div className="d-flex align-items-start justify-content-start flex-wrap">
                  <div className="checkbox">
                    <label
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "25px",
                      }}
                    >
                      <input
                        type="checkbox"
                        value={slot.active}
                        checked={slot.active}
                        disabled={slot.day === 0}
                        // checked={selectedDays.includes(weekday)}
                        onChange={() =>
                          handleSelectUnSelectSlot(index, slot, setFieldValue)
                        }
                        // disabled={weekday === "Sunday"}
                        style={{
                          marginBottom: "20px",
                          marginRight: "10px",
                          marginTop: "3px",
                        }}
                      />
                      {dayjs(slot.date).format("dddd")}
                    </label>
                  </div>
                  <div className="span ms-5">
                    {/* {props.date && props.date} */}
                    {/* {slot.date && FormateDate(slot.date)} */}
                  </div>
                  <Times
                    values={values}
                    slot={slot}
                    scheduleIndex={index}
                    setError={setError}
                    setFieldValue={setFieldValue}
                    startTimeValues={values.scheduleItems[index].startTime}
                    startTimeTouched={
                      touched &&
                      touched.scheduleItems &&
                      touched.scheduleItems[index] &&
                      touched.scheduleItems[index].startTime
                    }
                    startTimeErrors={
                      errors &&
                      errors.scheduleItems &&
                      errors.scheduleItems[index] &&
                      errors.scheduleItems[index].startTime
                    }
                    endTimeValues={values.scheduleItems[index].endTime}
                    endTimeTouched={
                      touched &&
                      touched.scheduleItems &&
                      touched.scheduleItems[index] &&
                      touched.scheduleItems[index].endTime
                    }
                    endTimeErrors={
                      errors &&
                      errors.scheduleItems &&
                      errors.scheduleItems[index] &&
                      errors.scheduleItems[index].endTime
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex align-items-center justify-content-center">
        {values.scheduleItems.length > 1 ? (
          <div className="edit">
            <Button variant="text" onClick={handleShowLessOrMore}>
              {isAllView ? (
                <MdKeyboardArrowUp style={{ fontSize: 20 }} />
              ) : (
                <MdOutlineKeyboardArrowDown style={{ fontSize: 20 }} />
              )}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default RepeatedDay;
