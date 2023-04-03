import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import "./timer.css";

const RestTimer: React.FC<{ duration: number }> = ({ duration }) => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time > 0) {
      const intervalId = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [time]);

  return (
    <Typography display="inline" className="focus-timer" variant="h2">
      {time}
    </Typography>
  );
};

export default RestTimer;
