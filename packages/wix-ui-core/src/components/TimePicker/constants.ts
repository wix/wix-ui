export enum FIELD {
    BEFORE = 0,
    HOUR = 1,
    MINUTE = 2,
    AMPM = 3,
    AFTER = 4,
}

export const BLANK = '--';

export const NULL_TIME = `${BLANK}:${BLANK}`;

export enum AmPmOptions {
    None,
    Lowercase,
    Uppercase,
    Capitalized,
}

export const AmPmStrings = {
    [AmPmOptions.Lowercase] : {am: 'am', pm: 'pm'},
    [AmPmOptions.Uppercase] : {am: 'AM', pm: 'PM'},
    [AmPmOptions.Capitalized] : {am: 'Am', pm: 'Pm'},
}
