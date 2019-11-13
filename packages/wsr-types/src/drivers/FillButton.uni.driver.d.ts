declare namespace __WSRTests {
  interface FillButtonUniDriver extends BaseUniDriver {
    getTooltipText: () => Promise<string>;
  }
}
