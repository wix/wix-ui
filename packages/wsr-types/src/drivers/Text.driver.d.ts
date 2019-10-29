declare namespace __WSRTests {
  interface TextDriver extends BaseDriver {
    getTagName: () => string;
    getText: () => string;
    getSize: () => __WSR.Text.TextSize;
    getSkin: () => __WSR.Text.TextSkin;
    getWeight: () => __WSR.Text.TextWeight;
    isLight: () => boolean;
    isSecondary: () => boolean;
  }

  interface TextPuppeteerDriver {
    element: () => import('puppeteer').ElementHandle;
    getValue: () => Promise<string>;
  }
}
