import React from "react";
import classes from "./DateDay.css";

const dayDate = () => {
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let tempDate = new Date();
  let date =
    tempDate.getDate() +
    "-" +
    (tempDate.getMonth() + 1) +
    "-" +
    tempDate.getFullYear();
  const currDate = "Date: " + date;
  const currDay = " " + day[tempDate.getDay()];

  return (
    <div className={classes.date}>
      <header className={classes.header}>
        <p>
          {currDate} {currDay}
        </p>
      </header>
    </div>
  );
};

export default dayDate;
