import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import "./timer.css";
import { getTimeLeft } from "../../utils/time";

const FocusTimer: React.FC<{ focusTime: number }> = ({ focusTime }) => {
  const [time, setTime] = useState({
    minutes: focusTime.toString().padStart(2, "0"),
    seconds: "00",
  });
  const [timePassed, setTimePassed] = useState(0);

  useEffect(() => {
    if (timePassed >= 0) {
      const intervalId = setInterval(() => {
        setTimePassed((timePassed) => timePassed + 1);
        setTime(getTimeLeft(timePassed + 1, focusTime));
      }, 1000);

      return () => {
        clearInterval(intervalId);

        console.log(time);
      };
    }
  }, [timePassed, time]);

  return (
    <Typography display="inline" className="focus-timer" variant="h2">
      {time.minutes}:{time.seconds}
    </Typography>
  );
};

export default FocusTimer;
