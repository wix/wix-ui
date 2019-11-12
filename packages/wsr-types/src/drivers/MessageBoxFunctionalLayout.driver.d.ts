declare namespace __WSRTests {
  interface MessageBoxFunctionalLayoutDriver<T> extends BaseDriver {
    element: () => T;
    getConfirmationButtonText: () => string;
    isConfirmationButtonPrefixIconExists: () => boolean;
    isConfirmationButtonSuffixIconExists: () => boolean;
    clickOnConfirmationButton: () => void;
    getConfirmationButton: () => HTMLButtonElement;
    getCancellationButton: () => HTMLButtonElement;
    getHeaderCloseButton: () => HTMLButtonElement;
    getCancellationButtonText: () => string;
    isCancellationButtonPrefixIconExists: () => boolean;
    isCancellationButtonSuffixIconExists: () => boolean;
    clickOnCancellationButton: () => void;
    clickOnHeaderCloseButton: () => void;
    isThemeExist: (
      theme: __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayoutTheme
    ) => boolean;
    getFooter: () => HTMLElement;
    getTitle: () => string;
    getChildBySelector: (selector: string) => HTMLElement | null;
    isCancelEnable: () => boolean;
    isConfirmationEnable: () => boolean;
    toHaveBodyPadding: () => boolean;
  }
}
