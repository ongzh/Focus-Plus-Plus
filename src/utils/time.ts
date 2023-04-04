export interface displayTime {
  minutes: string;
  seconds: string;
}

export function getTimeLeft(
  timePassed: number,
  focusTime: number
): displayTime {
  let seconds = "00";
  const minutes = `${focusTime - Math.ceil(timePassed / 60)}`.padStart(2, "0");
  if (timePassed % 60 != 0) {
    seconds = `${60 - (timePassed % 60)}`.padStart(2, "0");
  }

  return {
    minutes: minutes,
    seconds: seconds,
  };
}
