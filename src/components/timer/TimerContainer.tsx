import React, { useState, useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";
import FocusTimer from "./FocusTimer";
import {
  getStorageOptions,
  getStoredTimerStatus,
  setStoredTimerStatus,
} from "../../utils/storage";
import RestTimer from "./RestTimer";
const TimerContainer: React.FC<{}> = () => {
  const [timer, setTimer] = useState<number>(0);
  const [restTimer, setRestTimer] = useState<number>(0);
  const [isFocusing, setFocusing] = useState<boolean>(false);
  const [isResting, setResting] = useState<boolean>(false);
  const [focusTime, setFocusTime] = useState<number>(0);
  const [restTime, setRestTime] = useState<number>(0);

  useEffect(() => {
    getStoredTimerStatus().then((timerStatus) => {
      setFocusing(timerStatus.isFocusing);
      setResting(timerStatus.isResting);
      setTimer(timerStatus.timer);
      setRestTimer(timerStatus.restTimer);
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
    if (isResting) {
      intervalRef.current = setInterval(() => {
        getStoredTimerStatus().then((timerValue) => {
          setRestTimer(timerValue.restTimer);
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isResting]);

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
        restTimer,
        isFocusing: false,
        isResting: false,
      }).then(() => setFocusing(false));
    } else {
      setStoredTimerStatus({
        timer,
        restTimer,
        isFocusing: true,
        isResting: false,
      }).then(() => setFocusing(true));
    }
  };

  const handleResetButtonClick = () => {
    setStoredTimerStatus({
      timer: 0,
      restTimer: 0,
      isFocusing: false,
      isResting: false,
    }).then(() => {
      setFocusing(false);
      setTimer(0);
    });
  };

  const handleEndButtonClick = () => {
    if (isFocusing) {
      setStoredTimerStatus({
        timer: focusTime * 60,
        restTimer,
        isFocusing,
        isResting,
      }).then(() => {
        setFocusing(false);
        setResting(true);
        setTimer(focusTime * 60);
      });
    } else {
      setStoredTimerStatus({
        timer: 0,
        restTimer: restTime * 60,
        isFocusing,
        isResting,
      }).then(() => {
        setFocusing(false);
        setResting(false);
        setRestTimer(0);
        setTimer(0);
      });
    }
  };

  return (
    <>
      <Box>
        <FocusTimer focusTime={focusTime} timer={timer} />
      </Box>
      <Box>
        <RestTimer restTime={restTime} restTimer={restTimer} />
      </Box>
      <Box>
        <Button onClick={handleStartButtonClick}>
          {isFocusing ? "Pause Timer" : "Start Timer"}
        </Button>
        <Button onClick={handleResetButtonClick}>Reset Timer</Button>
        <Button onClick={handleEndButtonClick}> End Timer </Button>
      </Box>
    </>
  );
};

export default TimerContainer;
