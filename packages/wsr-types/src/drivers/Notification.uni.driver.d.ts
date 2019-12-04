declare namespace __WSRTests {
  interface NotificationUniDriver extends BaseUniDriver {
    getItemTitleAt: (idx: number) => Promise<string>;
    visible: () => Promise<boolean>;
    hasTheme: Promise<boolean>;
    isStandardNotification: () => Promise<boolean>;
    isErrorNotification: () => Promise<boolean>;
    isSuccessNotification: () => Promise<boolean>;
    isWarningNotification: () => Promise<boolean>;
    isPremiumNotification: () => Promise<boolean>;
    isSmallSize: () => Promise<boolean>;
    isBigSize: () => Promise<boolean>;
    getLabelText: () => Promise<string>;
    hasActionButton: () => Promise<boolean>
    getActionButtonText: () => Promise<string>;
    hasCloseButton: () => Promise<boolean>;
    isRelativelyPositioned: () => Promise<boolean>;
    isFixedPositioned: () => Promise<boolean>;
    isAbsolutePositioned: () => Promise<boolean>;
    clickOnCloseButton: () => Promise<void>;
    clickOnActionButton: () => Promise<void>;
    getZIndex: () => Promise<number>;
  }
}
