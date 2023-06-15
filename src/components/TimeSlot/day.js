import React from "react";
import { FieldArray } from "formik";
import "./style.scss";
import Times from "./Times";
import moment from "moment";

const Day = (props) => {
  const { values, touched, errors, setFieldValue } = props;
  return (
    <>
      <FieldArray name="scheduleItems">
        {({ remove, push }) => {
          return values.scheduleItems.map((slot, index) => (
            <div className="content" key={index}>
              <div className="d-flex">
                <div className="d-flex align-items-start justify-content-start flex-wrap">
                  <div className="span">
                    {/* {props.date && props.date} */}
                    {slot.date && moment(slot.date).format("ddd MMM DD YYYY")}
                    {/* {slot.date && slot.date.toDateString()} */}
                  </div>
                  <Times
                    slot={slot}
                    scheduleIndex={index}
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
          ));
        }}
      </FieldArray>
    </>
  );
};

export default Day;
