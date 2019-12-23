declare namespace __WSRTests {
  interface ListItemActionUniDriver extends BaseUniDriver {
    isTitleExists: () => Promise<boolean>;
    getTitleText: () => Promise<string>;
    isPrefixIconExists: () => Promise<boolean>;
    getSkin: () => Promise<__WSR.ListItemAction.ListItemActionSkin>;
    isDisabled: () => Promise<boolean>;
  }
}
