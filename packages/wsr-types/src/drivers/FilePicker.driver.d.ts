declare namespace __WSRTests {
  interface FilePickerDriver extends BaseDriver {
    hasError: () => boolean;
    errorMessage: () => string;
    getInput: () => string;
    getSubLabel: () => string;
    getMainLabel: () => string;
    getName: () => string;
  }
}
