declare namespace __WSRTests {
  interface ListItemActionUniDriver extends BaseUniDriver {
    isTitleExists: () => Promise<boolean>;
    getTitleText: () => Promise<string>;
    isPrefixIconExists: () => Promise<boolean>;
    getSkin: () => Promise<string | null>;
    isDisabled: () => Promise<boolean>;
  }
}
