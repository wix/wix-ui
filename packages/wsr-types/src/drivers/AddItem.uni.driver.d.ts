declare namespace __WSRTests {
  interface AddItemUniDriver extends BaseUniDriver {
    getText: () => Promise<any>;
    textExists: () => Promise<boolean>;
    getTooltipContent: () => Promise<string>;
  }
}
