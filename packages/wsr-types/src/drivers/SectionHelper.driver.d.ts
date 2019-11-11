declare namespace __WSRTests {
  interface SectionHelperDriver extends BaseDriver {
    titleText: () => string;
    actionText: () => string;
    clickAction: () => void;
    clickClose: () => void;
    isCloseButtonDisplayed: () => boolean;
    textContent: () => string;
    isWarning: () => boolean;
    isStandard: () => boolean;
    isDanger: () => boolean;
    isExperimentalDark: () => boolean;
    isSuccess: () => boolean;
    isPremium: () => boolean;
    isPreview: () => boolean;
  }
}
