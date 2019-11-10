declare namespace __WSRTests {
  interface FilePickerUniDriver extends BaseUniDriver {
    hasError: () => Promise<boolean>;
    errorMessage: () => Promise<string>;
    getInput: () => Promise<string>;
    getSubLabel: () => Promise<string>;
    getMainLabel: () => Promise<string>;
    getName: () => Promise<any>;
  }
}
