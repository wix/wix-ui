declare namespace __WSRTests {
  interface CheckboxUniDriver extends BaseUniDriver {
    click: () => Promise<void>;
    focus: () => Promise<void>;
    blur: () => Promise<void>;
    /**
     * @deprecated
     */
    hasFocusState: () => Promise<string | null>;
    isChecked: Promise<boolean>;
    isDisabled: () => Promise<boolean>;
    isIndeterminate: () => Promise<boolean>;
    hasError: () => Promise<boolean>;
    getLabel: () => Promise<string>;
    getLabelDriver: () => LabelUniDriver;
    getErrorMessage: () => Promise<string>;
  }
}
