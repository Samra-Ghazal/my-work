import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { FormateDate, FormateTime } from "../../utils";
import dayjs from "dayjs";

//generate random id
export const getRandomId = () => {
  const id = uuid();
  const hash = id.split("-").join("");
  const randomNumericId = parseInt(hash.substring(0, 10), 16);
  return (randomNumericId % 1000) + 1;
};

//Schema

export const timeSlotSchema = Yup.object().shape({
  scheduleItems: Yup.array()
    .of(
      Yup.object().shape({
        active: Yup.boolean().optional(),
        startTime: Yup.date().when("active", (active, schema) => {
          return active
            ? schema
                .transform((value, originalValue) => {
                  const parsedDate = new Date(originalValue);
                  return isNaN(parsedDate) ? undefined : parsedDate;
                })
                .required("Start Time is required")
                .nullable()
            : Yup.mixed().notRequired();
        }),

        endTime: Yup.date().when("active", (active, schema) => {
          return active
            ? schema
                .transform((value, originalValue) => {
                  const parsedDate = new Date(originalValue);
                  return isNaN(parsedDate) ? undefined : parsedDate;
                })
                .required("End Time is required")
                .nullable()
                .min(Yup.ref("startTime"), "End Time must be after Start Time")
            : schema.nullable;
        }),
      })
    )
    .min(1, "Must have at least one schedule item"),
  startDate: Yup.string().required("Start Date is Required"),
  endDate: Yup.string().required("End Date is Required"),
});

export const weekOptions = [
  { label: "1st Week", value: "week1", id: 1 },
  { label: "2nd Week", value: "week2", id: 2 },
  { label: "3rd week", value: "week3", id: 3 },
  { label: "4th week", value: "week4", id: 4 },
  { label: "5th week", value: "week5", id: 5 },
];

export const monthOptions = [
  { label: "1st ", value: "Jan", id: 1 },
  { label: "2nd ", value: "Feb", id: 2 },
  { label: "3rd ", value: "Mar", id: 3 },
  { label: "4th ", value: "Apr", id: 4 },
  { label: "5th ", value: "May", id: 5 },
  { label: "6th ", value: "Jun", id: 6 },
  { label: "7th ", value: "Jul", id: 7 },
  { label: "8th ", value: "Aug", id: 8 },
  { label: "9th ", value: "Sep", id: 9 },
  { label: "10th ", value: "Oct", id: 10 },
  { label: "11th ", value: "Nov", id: 11 },
  { label: "12th ", value: "Dec", id: 12 },
];

export const defaultItem = (day, week, date, month) => {
  const defaultItem = {
    day: day,
    week: week,
    month: month,
    startTime: [""],
    endTime: [""],
    date: date,
    active: false,
  };
  return defaultItem;
};

export const defaultItemDates = (date, month) => {
  const defaultItem = {
    month: month,
    startTime: [""],
    endTime: [""],
    date: date,
    active: false,
  };
  return defaultItem;
};

export const initialValuesofSlot = (
  action,
  editData,
  location,
  date,
  day,
  week,
  month
) => {
  const initialValues = {
    repeatedDates: action === "edit" ? editData.repeatedDates : false,
    repeatedDays: action === "edit" ? editData.repeatedDays : false,
    providerId: action === "edit" ? editData.id : getRandomId(),
    startDate:
      action === "edit"
        ? FormateDate(editData.startDate)
        : FormateDate(location.state.date.startDate)
        ? FormateDate(location.state.date.startDate)
        : "",
    endDate:
      action === "edit"
        ? FormateDate(editData.endDate)
        : FormateDate(location.state.date.endDate)
        ? FormateDate(location.state.date.endDate)
        : "",
    scheduleType: day ? 1 : 3,
    day: action === "edit" ? editData.day : date ? date : "",
    scheduleItems:
      action === "edit"
        ? editData.scheduleItems.map((slot) => ({
            active: slot.active,
            day: slot.day,
            week: slot.week,
            month: slot.month,
            date: slot.date,
            startTime: slot.active
              ? slot.startTime.map((time) => dayjs(time))
              : slot.startTime,
            endTime: slot.active
              ? slot.endTime.map((time) => dayjs(time))
              : slot.endTime,
          }))
        : [
            {
              day: day,
              month: month,
              week: week,
              startTime: [""],
              endTime: [""],
              date: date,
              active: true,
            },
          ],
  };
  return initialValues;
};

export const editFormatdata = (values) => {
  const scheduleItems = values.scheduleItems
    .filter((slot) => slot.active)
    .map((slot) => {
      return {
        date: FormateDate(slot.date),
        // date: FormateDate(values.startDate),
        startTime: slot.startTime.map((time) => FormateTime(time)),
        endTime: slot.endTime.map((time) => FormateTime(time)),
      };
    });
  return {
    provider: values.providerId,
    updateType: 1,
    scheduleItems: scheduleItems,
  };
};

export const formateData = (values) => {
  const scheduleItems = values.scheduleItems
    .filter((slot) => slot.active)
    .map((slot) => {
      return {
        week: slot.week,
        day: slot.day,
        startTime: slot.startTime.map((time) => FormateTime(time)),
        endTime: slot.endTime.map((time) => FormateTime(time)),
      };
    });
  return {
    businessData: {
      businessId: 1,
      businessStartTime: "06:00:00",
      businessEndTime: "16:00:00",
    },
    providerId: values.providerId,
    startDate: values.startDate,
    endDate: values.endDate,
    scheduleType: values.scheduleType,
    scheduleItems: scheduleItems,
  };
};

export const formateRepeatData = (values) => {
  const scheduleItems = values.scheduleItems
    .filter((slot) => slot.active)
    .map((slot) => {
      return {
        month: slot.month,
        date: FormateDate(slot.date),
        startTime: slot.startTime.map((time) => FormateTime(time)),
        endTime: slot.endTime.map((time) => FormateTime(time)),
      };
    });
  return {
    businessData: {
      businessId: 1,
      businessStartTime: "06:00:00",
      businessEndTime: "16:00:00",
    },
    providerId: values.providerId,
    startDate: values.startDate,
    endDate: values.endDate,
    scheduleType: values.scheduleType,
    scheduleItems: scheduleItems,
  };
};
