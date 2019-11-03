declare namespace __WSRTests {
  interface ButtonUniDriver extends BaseUniDriver {
    getButtonTextContent: () => Promise<string>;
    isButtonDisabled: () => Promise<boolean>;
    isFocused: () => Promise<boolean>;
    hasSkin: (skinName: __WSR.Button.ButtonSize) => Promise<boolean>;
  }
}
