declare namespace __WSRTests {
  interface SectionHelperUniDriver extends BaseUniDriver {
    titleText: () => Promise<String>;
    actionText: () => Promise<String>;
    clickAction: () => Promise<void>;
    clickClose: () => Promise<void>;
    isCloseButtonDisplayed: () => Promise<boolean>;
    textContent: () => Promise<string>;
    isWarning: () => Promise<boolean>;
    isStandard: () => Promise<boolean>;
    isDanger: () => Promise<boolean>;
    isExperimentalDark: () => Promise<boolean>;
    isSuccess: () => Promise<boolean>;
    isPremium: () => Promise<boolean>;
    isPreview: () => Promise<boolean>;
  }
}
