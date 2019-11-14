declare namespace __WSRTests {
  interface AccordionUniDriver extends BaseUniDriver {
    getItemTitleAt: (idx: number) => Promise<string>;
    isIconExistsAt: (idx: number) => Promise<boolean>;
    isItemExpandedAt: (idx: number) => Promise<boolean>;
    clickToggleButtonAt: (idx: number) => Promise<void>;
    getToggleButtonLabelAt: (idx: number) => Promise<string>;
  }
}
