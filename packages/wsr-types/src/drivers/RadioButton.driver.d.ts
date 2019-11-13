declare namespace __WSRTests {
  interface RadioButtonDriver extends BaseDriver {
    check: () => void;
    isChecked: () => boolean;
    isDisabled: () => boolean;
    getLabel: () => string;
    getTabIndex: () => string | null;
    getContent: () => HTMLElement;
  }
}
