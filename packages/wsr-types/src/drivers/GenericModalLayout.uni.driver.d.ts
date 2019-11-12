declare namespace __WSRTests {
  interface GenericModalLayoutUniDriver extends BaseUniDriver {
    isFullscreen: () => Promise<boolean>;
  }
}
