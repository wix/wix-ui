declare namespace __WSRTests {
  interface TextUniDriver extends BaseUniDriver {
    getTagName: () => Promise<string>;
    getText: () => Promise<string>;
    getSize: () => Promise<__WSR.Text.TextSize>;
    getSkin: () => Promise<__WSR.Text.TextSkin>;
    getWeight: () => Promise<__WSR.Text.TextWeight>;
    isLight: () => Promise<boolean>;
    isSecondary: () => Promise<boolean>;
  }
}
