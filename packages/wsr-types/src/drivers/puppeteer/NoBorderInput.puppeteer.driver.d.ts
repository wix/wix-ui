declare namespace __WSRTests {
  interface NoBorderInputPuppeteerDriver {
    element: () => import("puppeteer").ElementHandle;
    enterText: (text: string) => Promise<void>;
    getText: () => Promise<string>;
  }
}
