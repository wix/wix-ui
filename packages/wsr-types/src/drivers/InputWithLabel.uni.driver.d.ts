declare namespace __WSRTests {
  interface InputWithLabelUniDriver extends BaseUniDriver {
    getText: () => Promise<any>;
    textExists: () => Promise<boolean>;
    getTooltipContent: () => Promise<string>;
  }
}
