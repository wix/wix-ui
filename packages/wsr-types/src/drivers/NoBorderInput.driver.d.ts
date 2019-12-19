declare namespace __WSRTests {
  interface NoBorderInputDriver extends InputDriver {
    getLabel: () => string;
    getStatusMessage: () => string;
  }
}
