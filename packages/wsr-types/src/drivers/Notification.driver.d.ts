declare namespace __WSRTests {
  interface NotificationDriver extends BaseDriver {
    getItemTitleAt: (idx: number) => string;
    visible: () => boolean;
    hasTheme: boolean;
    isStandardNotification: () => boolean;
    isErrorNotification: () => boolean;
    isSuccessNotification: () => boolean;
    isWarningNotification: () => boolean;
    isPremiumNotification: () => boolean;
    isSmallSize: () => boolean;
    isBigSize: () => boolean;
    getLabelText: () => string;
    hasActionButton: () => boolean;
    getActionButtonText: () => string;
    hasCloseButton: () => boolean;
    isRelativelyPositioned: () => boolean;
    isFixedPositioned: () => boolean;
    isAbsolutePositioned: () => boolean;
    clickOnCloseButton: () => void;
    clickOnActionButton: () => void;
    getZIndex: () => number;
  }
}
