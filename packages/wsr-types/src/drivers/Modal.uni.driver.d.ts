declare namespace __WSRTests {
  interface ModalUniDriver extends BaseUniDriver {
    isOpen: Promise<boolean>;
    isThemeExist: (theme: __WSR.Modal.ModalTheme) => Promise<boolean>;
    getChildBySelector: (
      selector: string
    ) => Promise<import('wix-ui-test-utils/unidriver').UniDriver | null>;
    isScrollable: () => Promise<boolean>;
    closeButtonExists: () => Promise<boolean>;
    clickOnOverlay: () => Promise<void>;
    clickOnCloseButton: () => Promise<void>;
    getContentStyle: () => Promise<any>;
    getContentLabel: () => Promise<string | null>;
    getZIndex: () => Promise<any>;
  }
}
