export enum FIELD {
  NONE = 0,
  HOUR = 1,
  MINUTE = 2,
  AMPM = 3,
  AFTER = 4,
}

export const BLANK = '--';

export const NULL_TIME = `${BLANK}:${BLANK}`;

export const leftpad = str => ('00' + str).slice(-2);

export const getFieldFromPos = (pos: number) => Math.floor(pos / 3) + 1;

export const parseTime = (timeStr: string) => ({
  hour: timeStr.substr(0, 2),
  minute: timeStr.substr(3, 5)
});

export const isValidTime = (timeStr: string, useAmPm: boolean = false) => {
  const {hour, minute} = parseTime(timeStr);
  const nHour = parseInt(hour);
  const nMinute = parseInt(minute);
  return (
    timeStr.length === 5
    && timeStr[2] === ':'
    && nHour <= (useAmPm ? 12 : 24)
    && nMinute <= 59
  );
};

const changeTime = ({value, field, minuteStep = 1, hourStep = 1, separateSteps = false}) => {
  let hour = value.substr(0, 2);
  let minute = value.substr(3, 5);

  switch (field) {
    case FIELD.HOUR:
      if (hour === BLANK) { hour = 0; }
      hour = (parseInt(hour) + 24 + hourStep) % 24;
      break;

    case FIELD.AMPM:
      if (hour !== BLANK) { hour = (parseInt(hour) + 12) % 24; }
      break;

    case FIELD.MINUTE:
      minute = (parseInt(minute) || 0) + minuteStep;
      if (minute > 59) {
        if (!separateSteps && hour !== BLANK) { hour = ((parseInt(hour) || 0) + 1) % 24; }
        minute -= 60;
      } else if (minute < 0) {
        if (!separateSteps && hour !== BLANK) { hour = ((parseInt(hour) || 0) + 23) % 24; }
        minute += 60;
      }
      break;

    default:
  }

  return `${leftpad(hour)}:${leftpad(minute)}`;
};

export const increment = ({value, field, step = 1, separateSteps = false}) =>
  changeTime({
    value,
    field,
    minuteStep: step,
    hourStep: Math.floor(step / 60) || 1,
    separateSteps
  });

export const decrement = ({value, field, step = 1, separateSteps = false}) =>
  changeTime({
    value,
    field,
    minuteStep: -step,
    hourStep: -(Math.floor(step / 60) || 1),
    separateSteps
  });

export const convertToAmPm = value => {
  let hour = value.substr(0, 2);
  let ampm = 'AM';
  if (hour !== BLANK) {
    hour = parseInt(hour);
    if (hour > 11) { ampm = 'PM'; }
    hour = hour % 12;
    if (hour === 0) { hour = 12; }
  }
  return `${leftpad(hour)}:${value.substr(-2)} ${ampm}`;
};
