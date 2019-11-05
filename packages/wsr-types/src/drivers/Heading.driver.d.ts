declare namespace __WSRTests {
  interface HeadingDriver extends BaseDriver {
    getText: () => string;
    getAppearance: () => __WSR.Heading.HeadingAppearance | null;
    isLight: () => boolean;
  }
}
