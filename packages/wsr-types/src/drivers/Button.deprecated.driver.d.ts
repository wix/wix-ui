declare namespace __WSRTests {
  interface DeprecatedButtonDriver {
    exists: () => boolean;
    click: () => void;
    focus: () => void;
    blur: () => void;
    mouseEnter: () => void;
    mouseLeave: () => void;
    getButtonTextContent: () => string;
    isButtonDisabled: () => boolean;
    isPrefixIconExists: () => boolean;
    isSuffixIconExists: () => boolean;
  }
}
