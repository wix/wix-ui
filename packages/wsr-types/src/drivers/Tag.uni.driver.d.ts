declare namespace __WSRTests {
  interface TagUniDriver extends BaseUniDriver {
    isTiny: () => Promise<boolean>;
    isSmall: () => Promise<boolean>;
    isMedium: () => Promise<boolean>;
    isLarge: () => Promise<boolean>;
    isStandardTheme: () => Promise<boolean>;
    isWarningTheme: () => Promise<boolean>;
    isErrorTheme: () => Promise<boolean>;
    isDarkTheme: () => Promise<boolean>;
    isRemovable: () => Promise<boolean>;
    removeTag: () => Promise<void>;
    isThumbExists: () => Promise<boolean>;
    isDisabled: () => Promise<boolean>;
    getLabel: () => Promise<string>;
  }
}
