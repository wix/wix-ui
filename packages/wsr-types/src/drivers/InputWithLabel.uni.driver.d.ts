declare namespace __WSRTests {
  interface InputWithLabelUniDriver extends BaseUniDriver {
    getSuffixesCount: () => Promise<number>;
    hasErrorMessage: () => Promise<boolean>;
    getErrorMessage: () => Promise<string>;
    getValue: () => Promise<string>;
    clickInput: () => Promise<void>;
    enterText: (value: string) => Promise<void>;
    getLabelText: () => Promise<string>;
    isCustomInput: () => Promise<boolean>;
    isFocusedStyle: () => Promise<boolean>;
  }
}
