import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import "./timer.css";
import { getTimeLeft } from "../../utils/time";

const FocusTimer: React.FC<{
  focusTime: number;
  timer: number;
}> = ({ focusTime, timer }) => {
  return (
    <Typography display="inline" className="focus-timer" variant="h3">
      {getTimeLeft(timer, focusTime).minutes}:
      {getTimeLeft(timer, focusTime).seconds}
    </Typography>
  );
};

export default FocusTimer;
