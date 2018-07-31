import {
  FIELD,
  BLANK,
  NULL_TIME
} from './constants';

export const leftpad = str => ('00' + str).slice(-2);

export const getFieldFromPos = (pos: number) => Math.floor(pos / 3) + 1;

export const parseTime = (timeStr: string) => ({
  hour: timeStr.substr(0, 2),
  minute: timeStr.substr(3, 5)
});

export const isValidTime = (timeStr: string, useAmPm: boolean = false) => {
  // HH:MM with optional HH:MM:SS and optional HH:MM:SS.mmm
  const test12 = /^(0[1-9]|1[0-2]):([0-5][0-9])(:([0-5][0-9])(\.[0-9]{3})?)?$/;
  const test24 = /^([0-1][0-9]|2[0-3]):([0-5][0-9])(:([0-5][0-9])(\.[0-9]{3})?)?$/;
  return useAmPm
    ? test12.test(timeStr)
    : test24.test(timeStr);
};

const parseIntOrZero = str => parseInt(str) || 0;

const changeTime = ({value, field, step = 1}) => {
  let {hour, minute} = parseTime(value);

  switch (field) {
    case FIELD.HOUR:
      hour = `${(parseIntOrZero(hour) + 24 + Math.sign(step)) % 24}`;
      break;

    case FIELD.AMPM:
      if (hour !== BLANK) { hour = `${(parseIntOrZero(hour) + 12) % 24}`; }
      break;

    case FIELD.MINUTE:
      let nMinute = parseIntOrZero(minute);
      nMinute += step;
      if (nMinute > 59) {
        nMinute -= 60;
        if (hour !== BLANK) { hour = `${(parseIntOrZero(hour) + 1) % 24}`; }
      } else if (nMinute < 0) {
        nMinute += 60;
        if (hour !== BLANK) { hour = `${(parseIntOrZero(hour) + 23) % 24}`; }
      }
      minute = `${nMinute}`;
      break;

    default:
  }

  return `${leftpad(hour)}:${leftpad(minute)}`;

};

export const increment = ({value, field, step = 1}) =>
  changeTime({
    value,
    field,
    step: +step
  });

export const decrement = ({value, field, step = 1}) =>
  changeTime({
    value,
    field,
    step: -step
  });

export const convertToAmPm = ({value, strings = {am: 'AM', pm: 'PM'}}) => {
  let {hour, minute} = parseTime(value);
  let ampm = strings.am;
  if (hour !== BLANK) {
    let nHour = parseInt(hour);
    if (nHour > 11) { ampm = strings.pm; }
    nHour = nHour % 12;
    if (nHour === 0) { nHour = 12; }
    hour = leftpad(nHour);
  }
  return `${hour}:${minute} ${ampm}`;
};
