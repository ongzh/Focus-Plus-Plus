import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import "./timer.css";
import { getTimeLeft } from "../../utils/time";

const FocusTimer: React.FC<{
  focusTime: number;
  timer: number;
}> = ({ focusTime, timer }) => {
  const [displayTime, setDisplayTime] = useState({
    minutes: focusTime.toString().padStart(2, "0"),
    seconds: "00",
  });

  useEffect(() => {
    setDisplayTime(getTimeLeft(timer, focusTime));
  }, [displayTime]);

  return (
    <Typography display="inline" className="focus-timer" variant="h2">
      {displayTime.minutes}:{displayTime.seconds}
    </Typography>
  );
};

export default FocusTimer;
