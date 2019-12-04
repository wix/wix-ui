declare namespace __WSRTests {
  interface TimeInputDriver extends BaseDriver {
    getValue: () => string,
    isDisabled: () => boolean,
    clickTickerUp: () => void,
    clickTickerDown: () => void,
    isAmPmIndicatorExist: () => boolean,
    toggleAmPmIndicator: () => void,
    getAmPmIndicatorText: () => string,
    isRtl: () => boolean,
    setValue: (text: string) => void,
    blur: () => void,
  }
}
