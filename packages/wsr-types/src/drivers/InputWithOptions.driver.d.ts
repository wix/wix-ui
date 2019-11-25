declare namespace __WSRTests {
  interface InputWithOptionsDriver extends BaseDriver {
    inputDriver: InputDriver;
    dropdownLayoutDriver: DropdownLayoutDriver;
    driver: {
      exists: () => boolean;
      selectOptionById: (id: string | number) => void;
      isReadOnly: () => boolean;
      isEditable: () => boolean;
      isDisabled: () => boolean;
      inputWrapper: () => HTMLElement;
      focus: () => void;
      blur: () => void;
      pressKey: (key: string) => void;
      outsideClick: () => void;
      isOptionWrappedToHighlighter: (optionId: string | number) => void;
    };
  }
}
