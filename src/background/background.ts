import RestTimer from "../components/timer/RestTimer";
import {
  getStorageOptions,
  setStorageOptions,
  getStoredTimerStatus,
  setStoredTimerStatus,
} from "../utils/storage";
import { getTimeLeft } from "../utils/time";

chrome.runtime.onInstalled.addListener(() => {
  setStorageOptions({
    focusTime: 25,
    restTime: 5,
  });
  setStoredTimerStatus({
    isFocusing: false,
    isResting: false,
    timer: 0,
    restTimer: 0,
  });

  chrome.alarms.create("focusTimer", {
    periodInMinutes: 1 / 60,
  });
});
const registration = globalThis?.registration;

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "focusTimer") {
    getStorageOptions().then((options) => {
      getStoredTimerStatus().then((timerStatus) => {
        let timer = timerStatus.timer;
        let restTimer = timerStatus.restTimer;
        let isFocusing = timerStatus.isFocusing;
        let isResting = timerStatus.isResting;

        if (timerStatus.isFocusing) {
          timer++;
          if (timer >= options.focusTime * 60) {
            timer = 0;
            isFocusing = false;
            isResting = true;

            registration.showNotification("Time to rest!", {
              body: `${options.focusTime} minutes has passed! Rest time starts now!`,
              icon: "icon.png",
            });
            const badgeTime = getTimeLeft(timer, options.focusTime);
            chrome.action.setBadgeText({
              text: `${badgeTime.minutes}:${badgeTime.seconds}`,
            });
          }
        } else if (timerStatus.isResting) {
          restTimer++;
          if (restTimer >= options.restTime * 60) {
            restTimer = 0;
            isResting = false;

            registration.showNotification("Rest Time is Over!", {
              body: `${options.restTime} minutes has passed! Start another focus session!`,
              icon: "icon.png",
            });
            const badgeTime = getTimeLeft(restTimer, options.restTime);
            chrome.action.setBadgeText({
              text: `${badgeTime.minutes}:${badgeTime.seconds}`,
            });
          }
        } else {
          chrome.action.setBadgeText({
            text: "REST",
          });
        }
        setStoredTimerStatus({
          isFocusing,
          isResting,
          timer,
          restTimer,
        });
      });
    });
  }
});
