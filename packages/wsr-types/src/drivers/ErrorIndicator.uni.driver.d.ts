declare namespace __WSRTests {
  interface ErrorIndicatorUniDriver extends BaseUniDriver {
    isShown: () => Promise<boolean>;
    mouseEnter: () => Promise<void>;
    getErrorMessage: () => Promise<string>;
  }
}
