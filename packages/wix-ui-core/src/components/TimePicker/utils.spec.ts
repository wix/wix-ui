import {FIELD, BLANK, NULL_TIME} from './constants';
import {
  leftpad,
  parseTime,
  getFieldFromPos,
  isValidTime,
  increment,
  decrement,
  convertToAmPm
} from './utils';

describe('TimePicker utils', () => {
  describe('leftpad', () => {
    it('should return "00" for an empty string', () => {
      expect(leftpad('')).toEqual('00');
    });

    it('should return "04" for an input of "4"', () => {
      expect(leftpad('4')).toEqual('04');
    });

    it('should return "14" for an input of "14"', () => {
      expect(leftpad('14')).toEqual('14');
    });

    it('should return "14" for an input of "214"', () => {
      expect(leftpad('214')).toEqual('14');
    });
  });

  describe('parseTime', () => {
    it('should return hour = 10 and minutes = 45 from an input of "10:45"', () => {
      const {hour, minute} = parseTime('10:45');
      expect(hour).toEqual('10');
      expect(minute).toEqual('45');
    });
  });

  describe('increment', () => {
    describe('field = hour', () => {
      it('should return "01:--" for input of "--:--", default step', () => {
        expect(increment({value: NULL_TIME, field: FIELD.HOUR})).toEqual(`01:${BLANK}`);
      });

      it('should return "01:--" for input of "00:--", default step', () => {
        expect(increment({value: `00:${BLANK}`, field: FIELD.HOUR})).toEqual(`01:${BLANK}`);
      });

      it('should return "00:--" for input of "23:--", default step', () => {
        expect(increment({value: `23:${BLANK}`, field: FIELD.HOUR})).toEqual(`00:${BLANK}`);
      });

      it('should return "01:00" for input of "00:00", default step', () => {
        expect(increment({value: '00:00', field: FIELD.HOUR})).toEqual('01:00');
      });

      it('should increment by one hour for any step value', () => {
        expect(increment({value: '00:00', field: FIELD.HOUR, step: 20})).toEqual('01:00');
      });
    });

    describe('field = minute', () => {
      it('should return "--:01" for input of "--:--", default step', () => {
        expect(increment({value: NULL_TIME, field: FIELD.MINUTE})).toEqual(`${BLANK}:01`);
      });

      it('should return "--:01" for input of "--:00", default step', () => {
        expect(increment({value: `${BLANK}:00`, field: FIELD.MINUTE})).toEqual(`${BLANK}:01`);
      });

      it('should return "--:00" for input of "--:59", default step', () => {
        expect(increment({value: `${BLANK}:59`, field: FIELD.MINUTE})).toEqual(`${BLANK}:00`);
      });

      it('should return "10:40" for input of "10:20", step = 20', () => {
        expect(increment({value: '10:20', field: FIELD.MINUTE, step: 20})).toEqual('10:40');
      });

      it('should return "11:14" for input of "10:30", step = 44', () => {
        expect(increment({value: '10:30', field: FIELD.MINUTE, step: 44})).toEqual('11:14');
      });
    });

    describe('field = ampm', () => {
      it('should return "--:--" for input of "--:--"', () => {
        expect(increment({value: NULL_TIME, field: FIELD.AMPM})).toEqual(NULL_TIME);
      });

      it('should return "--:10" for input of "--:10"', () => {
        expect(increment({value: `${BLANK}:10`, field: FIELD.AMPM})).toEqual(`${BLANK}:10`);
      });

      it('should return "22:--" for input of "10:--"', () => {
        expect(increment({value: `10:${BLANK}`, field: FIELD.AMPM})).toEqual(`22:${BLANK}`);
      });

      it('should return "22:15" for input of "10:15"', () => {
        expect(increment({value: '10:15', field: FIELD.AMPM})).toEqual('22:15');
      });

      it('should return "10:15" for input of "22:15"', () => {
        expect(increment({value: '22:15', field: FIELD.AMPM})).toEqual('10:15');
      });
    });
  });

  describe('decrement', () => {
    describe('field = hour', () => {
      it('should return "23:--" for input of "--:--", default step', () => {
        expect(decrement({value: NULL_TIME, field: FIELD.HOUR})).toEqual(`23:${BLANK}`);
      });

      it('should return "23:--" for input of "00:--", default step', () => {
        expect(decrement({value: `00:${BLANK}`, field: FIELD.HOUR})).toEqual(`23:${BLANK}`);
      });

      it('should return "22:--" for input of "23:--", default step', () => {
        expect(decrement({value: `23:${BLANK}`, field: FIELD.HOUR})).toEqual(`22:${BLANK}`);
      });

      it('should return "23:00" for input of "00:00", default step', () => {
        expect(decrement({value: '00:00', field: FIELD.HOUR})).toEqual('23:00');
      });

      it('should return "23:00" for input of "00:00", step = 20', () => {
        expect(decrement({value: '00:00', field: FIELD.HOUR, step: 20})).toEqual('23:00');
      });
    });

    describe('field = minute', () => {
      it('should return "--:59" for input of "--:--", default step', () => {
        expect(decrement({value: NULL_TIME, field: FIELD.MINUTE})).toEqual(`${BLANK}:59`);
      });

      it('should return "--:59" for input of "--:00", default step', () => {
        expect(decrement({value: `${BLANK}:00`, field: FIELD.MINUTE})).toEqual(`${BLANK}:59`);
      });

      it('should return "--:58" for input of "--:59", default step', () => {
        expect(decrement({value: `${BLANK}:59`, field: FIELD.MINUTE})).toEqual(`${BLANK}:58`);
      });

      it('should return "10:20" for input of "10:40", step = 20', () => {
        expect(decrement({value: '10:40', field: FIELD.MINUTE, step: 20})).toEqual('10:20');
      });

      it('should return "10:30" for input of "11:14", step = 44', () => {
        expect(decrement({value: '11:14', field: FIELD.MINUTE, step: 44})).toEqual('10:30');
      });
    });

    describe('field = ampm', () => {
      it('should return "--:--" for input of "--:--"', () => {
        expect(decrement({value: NULL_TIME, field: FIELD.AMPM})).toEqual(NULL_TIME);
      });

      it('should return "--:10" for input of "--:10"', () => {
        expect(decrement({value: `${BLANK}:10`, field: FIELD.AMPM})).toEqual(`${BLANK}:10`);
      });

      it('should return "22:--" for input of "10:--"', () => {
        expect(decrement({value: `10:${BLANK}`, field: FIELD.AMPM})).toEqual(`22:${BLANK}`);
      });

      it('should return "22:15" for input of "10:15"', () => {
        expect(decrement({value: '10:15', field: FIELD.AMPM})).toEqual('22:15');
      });

      it('should return "10:15" for input of "22:15"', () => {
        expect(decrement({value: '22:15', field: FIELD.AMPM})).toEqual('10:15');
      });
    });
  });

  describe('isValidTime', () => {
    describe('24-hour values', () => {
      it('should return true for 00:00', () => expect(isValidTime('00:00')).toBeTruthy());
      it('should return true for 23:59', () => expect(isValidTime('23:59')).toBeTruthy());
      it('should return true for 00:00:00', () => expect(isValidTime('00:00:00')).toBeTruthy());
      it('should return true for 00:00:00.000', () => expect(isValidTime('00:00:00.000')).toBeTruthy());
      it('should return false for 0000', () => expect(isValidTime('0000')).toBeFalsy());
      it('should return false for 00;00', () => expect(isValidTime('00;00')).toBeFalsy());
      it('should return false for z0:00', () => expect(isValidTime('z0:00')).toBeFalsy());
      it('should return false for 24:00', () => expect(isValidTime('24:00')).toBeFalsy());
      it('should return false for --:--', () => expect(isValidTime('--:--')).toBeFalsy());
    });

    describe('12-hour values', () => {
      it('should return true for 12:00', () => expect(isValidTime('12:00', true)).toBeTruthy());
      it('should return true for 12:59', () => expect(isValidTime('12:59', true)).toBeTruthy());
      it('should return true for 12:00:00', () => expect(isValidTime('12:00:00', true)).toBeTruthy());
      it('should return true for 12:00:00.000', () => expect(isValidTime('12:00:00.000', true)).toBeTruthy());
      it('should return false for 0000', () => expect(isValidTime('0000', true)).toBeFalsy());
      it('should return false for 00;00', () => expect(isValidTime('00;00', true)).toBeFalsy());
      it('should return false for 00:00:00', () => expect(isValidTime('00:00:00', true)).toBeFalsy());
      it('should return false for z0:00', () => expect(isValidTime('z0:00', true)).toBeFalsy());
      it('should return false for 13:00', () => expect(isValidTime('13:00', true)).toBeFalsy());
      it('should return false for 00:00', () => expect(isValidTime('00:00', true)).toBeFalsy());
      it('should return false for --:--', () => expect(isValidTime('--:--', true)).toBeFalsy());
    });
  });

  describe('convertToAmPm', () => {
    it('should return "12:00 AM" for "00:00"', () => expect(convertToAmPm({value: '00:00'})).toEqual('12:00 AM'));
    it('should return "11:59 AM" for "11:59"', () => expect(convertToAmPm({value: '11:59'})).toEqual('11:59 AM'));
    it('should return "12:00 PM" for "12:00"', () => expect(convertToAmPm({value: '12:00'})).toEqual('12:00 PM'));
    it('should return "11:59 PM" for "23:59"', () => expect(convertToAmPm({value: '23:59'})).toEqual('11:59 PM'));
    it('should return "12:00 am" for "00:00" with lowercase strings', () => expect(convertToAmPm({value: '00:00', strings: {am: 'am', pm: 'pm'}})).toEqual('12:00 am'));
    it('should return "12:00 pm" for "12:00" with lowercase strings', () => expect(convertToAmPm({value: '12:00', strings: {am: 'am', pm: 'pm'}})).toEqual('12:00 pm'));
  });

  describe('getFieldFromPos', () => {
    it('should return FIELD.HOUR for 0', () => expect(getFieldFromPos(0)).toEqual(FIELD.HOUR));
    it('should return FIELD.HOUR for 1', () => expect(getFieldFromPos(1)).toEqual(FIELD.HOUR));
    it('should return FIELD.HOUR for 2', () => expect(getFieldFromPos(2)).toEqual(FIELD.HOUR));
    it('should return FIELD.MINUTE for 3', () => expect(getFieldFromPos(3)).toEqual(FIELD.MINUTE));
    it('should return FIELD.MINUTE for 4', () => expect(getFieldFromPos(4)).toEqual(FIELD.MINUTE));
    it('should return FIELD.MINUTE for 5', () => expect(getFieldFromPos(5)).toEqual(FIELD.MINUTE));
    it('should return FIELD.AMPM for 6', () => expect(getFieldFromPos(6)).toEqual(FIELD.AMPM));
    it('should return FIELD.AMPM for 7', () => expect(getFieldFromPos(7)).toEqual(FIELD.AMPM));
    it('should return FIELD.AMPM for 8', () => expect(getFieldFromPos(8)).toEqual(FIELD.AMPM));
    it('should return FIELD.AFTER for 9', () => expect(getFieldFromPos(9)).toEqual(FIELD.AFTER));
  });
});
