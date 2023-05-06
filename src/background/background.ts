import { lightGreen } from "@mui/material/colors";
import RestTimer from "../components/timer/RestTimer";
import {
  getStorageOptions,
  setStorageOptions,
  getStoredTimerStatus,
  setStoredTimerStatus,
  setStoredTasks,
  setStoredCompletedTaskCount,
  setStoredBlockOptions,
} from "../utils/storage";
import { getTimeLeft } from "../utils/time";
import { resetBlockRules, defaultBlockOptions } from "../utils/block";
chrome.runtime.onInstalled.addListener(() => {
  setStorageOptions({
    focusTime: 25,
    restTime: 5,
    notifications: true,
  });
  setStoredTimerStatus({
    isFocusing: false,
    isResting: false,
    timer: 0,
    restTimer: 0,
  });
  setStoredTasks([]);
  setStoredCompletedTaskCount(0);
  setStoredBlockOptions(defaultBlockOptions);

  chrome.alarms.create("focusTimer", {
    periodInMinutes: 1 / 60,
  });

  chrome.contextMenus.create({
    contexts: ["page"],
    title: "focus++ Menu",
    id: "focusMenu",
  });

  chrome.contextMenus.create({
    contexts: ["page"],
    title: "Start Focus Session",
    id: "focusTimer",
    parentId: "focusMenu",
  });

  chrome.contextMenus.create({
    contexts: ["page"],
    title: "Reset Timer",
    id: "resetTimer",
    parentId: "focusMenu",
  });

  chrome.contextMenus.create({
    contexts: ["page"],
    title: "End Focus Session",
    id: "endSession",
    parentId: "focusMenu",
  });

  chrome.contextMenus.create({
    contexts: ["page"],
    title: "Options",
    id: "focusOptions",
    parentId: "focusMenu",
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
        let allowNotifications = options.notifications;

        if (timerStatus.isFocusing) {
          timer++;
          if (timer >= options.focusTime * 60) {
            isFocusing = false;
            isResting = true;
            if (allowNotifications) {
              registration.showNotification("Time to rest!", {
                body: `${options.focusTime} minutes has passed! Rest time starts now!`,
                icon: "icon.png",
              });
              //remove the block rules
              resetBlockRules();
            }
          }
          const badgeTime = getTimeLeft(timer, options.focusTime);
          chrome.action.setBadgeText({
            text: `${badgeTime.minutes}:${badgeTime.seconds}`,
          });
          chrome.action.setBadgeBackgroundColor({
            color: "green",
          });
        } else if (timerStatus.isResting) {
          restTimer++;
          if (restTimer >= options.restTime * 60) {
            restTimer = 0;
            timer = 0;
            isResting = false;
            if (allowNotifications) {
              registration.showNotification("Rest Time is Over!", {
                body: `${options.restTime} minutes has passed! Start another focus session!`,
                icon: "icon.png",
              });
            }
          }
          const badgeTime = getTimeLeft(restTimer, options.restTime);
          chrome.action.setBadgeText({
            text: `${badgeTime.minutes}:${badgeTime.seconds}`,
          });
          chrome.action.setBadgeBackgroundColor({
            color: "orange",
          });
        } else if (timer == 0 && restTimer == 0) {
          chrome.action.setBadgeText({
            text: "",
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

function updateContextMenuTimer(isRunning: boolean) {
  chrome.contextMenus.update("focusTimer", {
    title: isRunning ? "Pause Focus Session" : "Start Focus Session",
  });
}

function updateContextMenuEndSession(isFocusing: boolean) {
  chrome.contextMenus.update("endSession", {
    title: isFocusing ? "End Focus Session" : "End Rest Session",
  });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "focusTimer") {
    getStoredTimerStatus().then((timerStatus) => {
      getStorageOptions().then((options) => {
        if (timerStatus.isFocusing || timerStatus.isResting) {
          setStoredTimerStatus({
            isFocusing: false,
            isResting: false,
            timer: timerStatus.timer,
            restTimer: timerStatus.restTimer,
          });
          updateContextMenuTimer(false);
        } else if (options.focusTime * 60 <= timerStatus.timer) {
          setStoredTimerStatus({
            isFocusing: false,
            isResting: true,
            timer: timerStatus.timer,
            restTimer: timerStatus.restTimer,
          });
          updateContextMenuTimer(true);
        } else {
          setStoredTimerStatus({
            isFocusing: true,
            isResting: false,
            timer: timerStatus.timer,
            restTimer: timerStatus.restTimer,
          });
          updateContextMenuTimer(true);
        }
      });
    });
  }

  if (info.menuItemId === "resetTimer") {
    setStoredTimerStatus({
      isFocusing: false,
      isResting: false,
      timer: 0,
      restTimer: 0,
    });
    updateContextMenuTimer(false);
  }

  if (info.menuItemId === "endSession") {
    getStoredTimerStatus().then((timerStatus) => {
      getStorageOptions().then((options) => {
        if (timerStatus.isFocusing) {
          setStoredTimerStatus({
            isFocusing: timerStatus.isFocusing,
            isResting: timerStatus.isResting,
            timer: options.focusTime * 60,
            restTimer: 0,
          });
          updateContextMenuTimer(true);
          updateContextMenuEndSession(false);
        } else if (timerStatus.isResting) {
          setStoredTimerStatus({
            isFocusing: timerStatus.isFocusing,
            isResting: timerStatus.isResting,
            timer: 0,
            restTimer: options.restTime * 60,
          });
          updateContextMenuTimer(false);
          updateContextMenuEndSession(true);
        }
      });
    });
  }

  if (info.menuItemId === "focusOptions") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("options.html"),
    });
  }
});
