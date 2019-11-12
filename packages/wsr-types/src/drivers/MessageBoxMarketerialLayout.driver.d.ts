declare namespace __WSRTests {
  interface MessageBoxMarketerialLayoutDriver extends BaseDriver {
    getPrimaryButtonText: () => string;
    getPrimaryButton: () => HTMLButtonElement;
    getSecondaryButtonText: () => string;
    getSecondaryButton: () => HTMLElement;
    getHeaderCloseButton: () => HTMLButtonElement;
    clickOnPrimaryButton: () => void;
    clickOnSecondaryButton: () => void;
    closeMessageBox: () => void;
    getTitle: () => string;
    getContentBySelector: (selector: string) => HTMLElement | null;
    getImageSrc: () => string;
  }
}
