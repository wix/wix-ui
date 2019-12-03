declare namespace __WSRTests {
  interface TablePuppeteerDriver {
    element: () => import("puppeteer").ElementHandle;
    exists: () => Promise<boolean>;
    getCellTextValue: (row?: number, column?: number) => Promise<string>;
  }
}
