import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import "./timer.css";
import { getTimeLeft } from "../../utils/time";

const RestTimer: React.FC<{
  restTime: number;
  restTimer: number;
}> = ({ restTime, restTimer }) => {
  return (
    <Typography display="inline" className="rest-timer" component="h3">
      {getTimeLeft(restTimer, restTime).minutes}:
      {getTimeLeft(restTimer, restTime).seconds}
    </Typography>
  );
};

export default RestTimer;
