import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import "./timer.css";
import { getTimeLeft } from "../../utils/time";

const RestTimer: React.FC<{
  restTime: number;
  timer: number;
}> = ({ restTime, timer }) => {
  return (
    <Typography display="inline" className="rest-timer" component="h3">
      {getTimeLeft(timer, restTime).minutes}:
      {getTimeLeft(timer, restTime).seconds}
    </Typography>
  );
};

export default RestTimer;
