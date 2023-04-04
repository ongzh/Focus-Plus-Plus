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
});
