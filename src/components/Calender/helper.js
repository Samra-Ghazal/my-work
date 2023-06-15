//set the backend format data
import { FormateDate } from "../../utils";

export const formateData = (values) => {
  return values.scheduleItems.map((slot) => {
    return {
      active: slot.active,
      week: slot.week,
      day: slot.day,
      date: FormateDate(slot.date),
      startTime: slot.active
        ? slot.startTime.map(
            (time) => (time && time.format("YYYY-MM-DDTHH:mm")) || ""
          )
        : slot.startTime,
      endTime: slot.active
        ? slot.endTime.map(
            (time) => (time && time.format("YYYY-MM-DDTHH:mm")) || ""
          )
        : slot.endTime,
    };
  });
};
