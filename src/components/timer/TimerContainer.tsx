import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import FocusTimer from "./FocusTimer";
import { getStorageOptions, getStoredTimerStatus } from "../../utils/storage";
const TimerContainer: React.FC<{}> = () => {
  const [timer, setTimer] = useState<number>(0);
  const [isFocusing, setFocusing] = useState<boolean>(false);
  const [focusTime, setFocusTime] = useState<number>(0);
  const [restTime, setRestTime] = useState<number>(0);

  useEffect(() => {
    getStoredTimerStatus().then((timerStatus) => {
      console.log(timerStatus);
      setTimer(timerStatus.timer);
      setFocusing(timerStatus.isFocusing);
    });
  }, [timer, isFocusing]);

  useEffect(() => {
    getStorageOptions().then((options) => {
      console.log(options);
      setFocusTime(options.focusTime);
      setRestTime(options.restTime);
    });
  }, [focusTime, restTime]);

  return (
    <Box>
      <FocusTimer focusTime={focusTime} timer={timer} />
    </Box>
  );
};

export default TimerContainer;
