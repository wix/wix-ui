declare namespace __WSRTests {
  interface FormFieldPuppeteerDriver {
    element: () => import('puppeteer').ElementHandle;
    getLabelValue: () => Promise<string>;
    getTooltipInfoValue: (delay: number) => Promise<string>;
    isRequired: () => Promise<boolean>;
  }
}
