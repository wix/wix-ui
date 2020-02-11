declare namespace __WSRTests {
  interface AutoCompleteWithLabelUniDriver extends BaseUniDriver {
    getLabelText: () => Promise<string>;
    getValue: () => Promise<string>;
    enterText: (value: string) => Promise<void>;
    clickAtOption: (optionIndex: number) => Promise<void>;
    clickAtOptionWithValue: (value: string) => Promise<void>;
    clickMenuArrow: () => Promise<void>;
    isDisabled: () => Promise<boolean>;
    blur: () => Promise<void>;
    hasError: () => Promise<boolean>;
  }
}
