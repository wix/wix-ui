declare namespace __WSRTests {
  interface TimeInputUniDriver extends BaseUniDriver {
    getValue: () => Promise<string>,
    isDisabled: () => Promise<boolean>,
    clickTickerUp: () => Promise<void>,
    clickTickerDown: () => Promise<void>,
    isAmPmIndicatorExist: () => Promise<boolean>,
    toggleAmPmIndicator: () => Promise<void>,
    getAmPmIndicatorText: () => Promise<string>,
    isRtl: () => Promise<boolean>,
    setValue: (text: string) => Promise<void>,
    blur: () => Promise<void>,
  }
}
