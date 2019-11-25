declare namespace __WSRTests {
  interface InputWithOptionsUniDriver extends BaseUniDriver {
    driver: {
      exists: () => Promise<boolean>;
      selectOptionById: (id: number | string) => Promise<void>;
      isReadOnly: InputUniDriver["getReadOnly"];
      isEditable: () => Promise<boolean>;
      isDisabled: InputUniDriver["isDisabled"];
      /** @deprecated  Should be private */
      inputWrapper: () => Promise<any>;
      focus: () => Promise<void>;
      blur: () => Promise<void>;
      pressKey: (key: string) => Promise<void>;
      outsideClick: () => Promise<void>;
      isOptionWrappedToHighlighter: (
        optionId: string | number
      ) => Promise<boolean>;
    };
    inputDriver: InputUniDriver;
    dropdownLayoutDriver: DropdownLayoutUniDriver;
  }
}
