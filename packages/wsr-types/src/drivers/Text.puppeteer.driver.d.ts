declare namespace __WSRTests {
  interface TextPuppeteerDriver {
    element: () => import('puppeteer').ElementHandle;
    getValue: () => Promise<string>;
  }
}
