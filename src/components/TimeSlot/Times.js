import React from "react";
import { Button } from "@mui/material";
import "./style.scss";
import InputTime from "../InputTime";

const Times = (props) => {
  const {
    scheduleIndex,
    setFieldValue,
    startTimeValues,
    startTimeTouched,
    startTimeErrors,
    endTimeValues,
    endTimeTouched,
    endTimeErrors,
    slot,
  } = props;
  const handleAddTimeSlot = () => {
    setFieldValue(
      `scheduleItems.${scheduleIndex}.startTime`,
      startTimeValues ? [...startTimeValues, ""] : []
    );
    setFieldValue(
      `scheduleItems.${scheduleIndex}.endTime`,
      endTimeValues ? [...endTimeValues, ""] : []
    );
  };

  const handleRemoveTimeSlot = (currIIndex) => {
    const currStartTime =
      (startTimeValues &&
        startTimeValues.filter((time, index) => index !== currIIndex)) ||
      [];

    const currEndTime =
      (endTimeValues &&
        endTimeValues.filter((time, index) => index !== currIIndex)) ||
      [];
    setFieldValue(`scheduleItems.${scheduleIndex}.startTime`, currStartTime);
    setFieldValue(`scheduleItems.${scheduleIndex}.endTime`, currEndTime);
  };
  return (
    <>
      <div>
        {startTimeValues &&
          startTimeValues.length > 0 &&
          startTimeValues.map((time, index) => {
            return (
              <div
                className={` ${
                  startTimeValues && startTimeValues.length > 1
                    ? "formatFlex"
                    : "format"
                }`}
              >
                <div className="format d-flex flex-wrap">
                  <div className="padding">
                    <div className="time">From</div>

                    <InputTime
                      id={`scheduleItems.${scheduleIndex}.startTime.${index}`}
                      name={`scheduleItems.${scheduleIndex}.startTime.${index}`}
                      value={
                        startTimeValues && startTimeValues[index]
                        // ? dayjs(startTimeValues[index])
                        // : ""
                      }
                      sx={{
                        width: 150,
                        backgroundColor: "hwb(187 78% 5%)",
                      }}
                      className="format"
                      disabled={slot.day === 0}
                      helperText={
                        startTimeTouched &&
                        startTimeTouched[index] &&
                        startTimeErrors &&
                        startTimeErrors[index]
                      }
                      onChange={(newValue) => {
                        setFieldValue(
                          `scheduleItems.${scheduleIndex}.startTime.${index}`,
                          newValue
                          // FormateTime(newValue)
                        );
                      }}
                    />

                    {startTimeErrors ? (
                      <div className="pb-3">
                        {<p className="form-error">{startTimeErrors}</p>}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className=" padding">
                    <div className="time">To</div>
                    <InputTime
                      id={`scheduleItems.${scheduleIndex}.endTime.${index}`}
                      name={`scheduleItems.${scheduleIndex}.endTime.${index}`}
                      value={
                        endTimeValues && endTimeValues[index]
                        // ? dayjs(endTimeValues[index])
                        // : ""
                      }
                      sx={{
                        width: "150px",
                        backgroundColor: "hwb(187 78% 5%)",
                      }}
                      disabled={slot.day === 0}
                      minTime={
                        startTimeValues && startTimeValues[index]
                        // ? dayjs(startTimeValues[index])
                        // : ""
                      }
                      helperText={
                        endTimeTouched &&
                        endTimeTouched[index] &&
                        endTimeErrors &&
                        endTimeErrors[index]
                      }
                      onChange={(newValue) => {
                        setFieldValue(
                          `scheduleItems.${scheduleIndex}.endTime.${index}`,
                          newValue
                        );
                      }}
                    />
                    {endTimeErrors ? (
                      <div className="pb-3">
                        {<p className="form-error">{endTimeErrors}</p>}
                      </div>
                    ) : null}
                  </div>

                  <div className="d-flex flex-wrap pb-1">
                    <div className="button">
                      <Button
                        variant="outlined"
                        disabled={slot.day === 0}
                        onClick={handleAddTimeSlot}
                      >
                        <span style={{ size: "20px" }}>+</span>
                      </Button>
                    </div>
                    {/* )} */}
                    {startTimeValues && startTimeValues.length > 1 && (
                      <div className="button">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            handleRemoveTimeSlot(index);
                          }}
                        >
                          <span style={{ size: "10px" }}>X</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Times;
