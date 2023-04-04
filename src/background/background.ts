import RestTimer from "../components/timer/RestTimer";
import {
  getStorageOptions,
  setStorageOptions,
  getStoredTimerStatus,
  setStoredTimerStatus,
} from "../utils/storage";

chrome.runtime.onInstalled.addListener(() => {
  setStorageOptions({
    focusTime: 25,
    restTime: 5,
  });
  setStoredTimerStatus({
    isFocusing: false,
    isResting: false,
    timer: 0,
  });

  chrome.alarms.create("focusTimer", {
    periodInMinutes: 1 / 60,
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "focusTimer") {
    getStoredTimerStatus().then((timerStatus) => {
      if (timerStatus.isFocusing) {
        console.log(timerStatus.timer);
        setStoredTimerStatus({
          timer: timerStatus.timer + 1,
          isFocusing: timerStatus.isFocusing,
          isResting: timerStatus.isResting,
        });
      }
    });
  }
});
