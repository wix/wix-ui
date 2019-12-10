declare namespace __WSRTests {
  interface ProportionUniDriver extends BaseUniDriver {
    getAspectRatio: () => Promise<number>;
    isAspectRatioDisabled: () => Promise<boolean>;
  }
}
