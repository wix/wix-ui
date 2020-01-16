declare namespace __WSRTests {
  interface MessageBoxMarketerialLayoutUniDriver extends BaseUniDriver {
    getPrimaryButtonText: () => Promise<string>;
    getPrimaryButton: () => Promise<
      import('wix-ui-test-utils/unidriver').UniDriver | null
    >;
    getPrimaryButtonNode: () => Promise<
      import('wix-ui-test-utils/unidriver').UniDriver | null
    >;
    getSecondaryButtonText: () => Promise<string>;
    getSecondaryButton: () => Promise<
      import('wix-ui-test-utils/unidriver').UniDriver | null
    >;
    getHeaderCloseButton: () => Promise<
      import('wix-ui-test-utils/unidriver').UniDriver | null
    >;
    clickOnPrimaryButton: () => void;
    clickOnSecondaryButton: () => void;
    closeMessageBox: () => void;
    getTitle: () => Promise<string>;
    getContentBySelector: (
      selector: string
    ) => Promise<import('wix-ui-test-utils/unidriver').UniDriver | null>;
    getImageSrc: () => Promise<string | null>;
  }
}
