declare namespace __WSRTests {
  interface MessageBoxFunctionalLayoutUniDriver extends BaseUniDriver {
    getConfirmationButtonText: () => Promise<string>;
    isConfirmationButtonPrefixIconExists: () => Promise<boolean>;
    isConfirmationButtonSuffixIconExists: () => Promise<boolean>;
    clickOnConfirmationButton: () => Promise<void>;
    getConfirmationButton: () => Promise<
      import('wix-ui-test-utils/unidriver').UniDriver | null
    >;
    getCancellationButton: () => Promise<
      import('wix-ui-test-utils/unidriver').UniDriver | null
    >;
    getHeaderCloseButton: () => Promise<
      import('wix-ui-test-utils/unidriver').UniDriver | null
    >;
    getCancellationButtonText: () => Promise<string>;
    isCancellationButtonPrefixIconExists: () => Promise<boolean>;
    isCancellationButtonSuffixIconExists: () => Promise<boolean>;
    clickOnCancellationButton: () => Promise<void>;
    clickOnHeaderCloseButton: () => Promise<void>;
    isThemeExist: (
      theme: __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayoutTheme
    ) => Promise<boolean>;
    getFooter: () => Promise<
      import('wix-ui-test-utils/unidriver').UniDriver | null
    >;
    getTitle: () => Promise<string>;
    getChildBySelector: (
      selector: string
    ) => Promise<import('wix-ui-test-utils/unidriver').UniDriver | null>;
    isCancelEnable: () => Promise<boolean>;
    isConfirmationEnable: () => Promise<boolean>;
    toHaveBodyPadding: () => Promise<boolean>;
  }
}
