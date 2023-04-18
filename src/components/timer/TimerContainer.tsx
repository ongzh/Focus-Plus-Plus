import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Paper, Stack, LinearProgress } from "@mui/material";
import FocusTimer from "./FocusTimer";
import {
  getStorageOptions,
  getStoredTimerStatus,
  setStoredTimerStatus,
} from "../../utils/storage";
import RestTimer from "./RestTimer";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

const TimerContainer: React.FC<{}> = () => {
  const [timer, setTimer] = useState<number>(0);
  const [restTimer, setRestTimer] = useState<number>(0);
  const [focusTime, setFocusTime] = useState<number>(0);
  const [restTime, setRestTime] = useState<number>(0);
  const [isFocusing, setFocusing] = useState<boolean>(false);
  const [isResting, setResting] = useState<boolean>(false);

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
    if (isFocusing || isResting) {
      setStoredTimerStatus({
        timer,
        restTimer,
        isFocusing: false,
        isResting: false,
      }).then(() => {
        setFocusing(false);
        setResting(false);
      });
    } else if (focusTime * 60 <= timer) {
      setStoredTimerStatus({
        timer,
        restTimer,
        isFocusing: false,
        isResting: true,
      }).then(() => setResting(true));
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
      setResting(false);
      setTimer(0);
      setRestTimer(0);
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
    } else if (isResting) {
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
      <Paper className="time-container">
        <Box className="timer-container">
          <FocusTimer focusTime={focusTime} timer={timer} />
          <RestTimer restTime={restTime} restTimer={restTimer} />
        </Box>
        <Box m={1.5}>
          <LinearProgress
            variant="determinate"
            value={
              isFocusing
                ? (timer * 100) / (focusTime * 60)
                : (restTimer * 100) / (restTime * 60)
            }
            color={isFocusing ? "primary" : "inherit"}
          ></LinearProgress>
        </Box>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            fullWidth
            size="small"
            variant="outlined"
            onClick={handleStartButtonClick}
            endIcon={
              isFocusing || isResting ? (
                <PauseRoundedIcon />
              ) : (
                <PlayArrowRoundedIcon />
              )
            }
          >
            {isFocusing || isResting ? "Pause" : "Start"}
          </Button>
          <Button
            fullWidth
            size="small"
            variant="outlined"
            onClick={handleResetButtonClick}
            endIcon={<RestartAltRoundedIcon />}
          >
            Reset
          </Button>
          <Button
            fullWidth
            size="small"
            variant="outlined"
            onClick={handleEndButtonClick}
            endIcon={<SkipNextRoundedIcon />}
          >
            End
          </Button>
        </Stack>
      </Paper>
    </>
  );
};

export default TimerContainer;
