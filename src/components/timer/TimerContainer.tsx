import React, { useState, useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";
import FocusTimer from "./FocusTimer";
import {
  getStorageOptions,
  getStoredTimerStatus,
  setStoredTimerStatus,
} from "../../utils/storage";
const TimerContainer: React.FC<{}> = () => {
  const [timer, setTimer] = useState<number>(0);
  const [isFocusing, setFocusing] = useState<boolean>(false);
  const [focusTime, setFocusTime] = useState<number>(0);
  const [restTime, setRestTime] = useState<number>(0);

  useEffect(() => {
    getStoredTimerStatus().then((timerStatus) => {
      setFocusing(timerStatus.isFocusing);
      setTimer(timerStatus.timer);
    });
  }, []);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isFocusing) {
      intervalRef.current = setInterval(() => {
        getStoredTimerStatus().then((timerValue) => {
          setTimer(timerValue.timer);
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isFocusing]);

  useEffect(() => {
    getStorageOptions().then((options) => {
      console.log(options);
      setFocusTime(options.focusTime);
      setRestTime(options.restTime);
    });
  }, [focusTime, restTime]);

  const handleStartButtonClick = () => {
    if (isFocusing) {
      console.log("stop");
      setFocusing(false);
      setStoredTimerStatus({
        timer,
        isFocusing: false,
        isResting: false,
      }).then(() => setFocusing(false));
    } else {
      setStoredTimerStatus({
        timer,
        isFocusing: true,
        isResting: false,
      }).then(() => setFocusing(true));
    }
  };

  const handleResetButtonClick = () => {
    setStoredTimerStatus({
      timer: 0,
      isFocusing: false,
      isResting: false,
    }).then(() => {
      setFocusing(false);
      setTimer(0);
    });
  };

  return (
    <>
      <Box>
        <FocusTimer focusTime={focusTime} timer={timer} />
      </Box>
      <Box>
        <Button onClick={handleStartButtonClick}>
          {isFocusing ? "Pause Timer" : "Start Timer"}
        </Button>
        <Button onClick={handleResetButtonClick}>Reset Timer</Button>
      </Box>
    </>
  );
};

export default TimerContainer;
