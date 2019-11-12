declare namespace __WSRTests {
  interface ModalMobileLayoutUniDriver extends BaseUniDriver {
    getTitle: () => import('wix-ui-test-utils/unidriver').UniDriver;
    getContent: () => import('wix-ui-test-utils/unidriver').UniDriver;
    getFooter: () => import('wix-ui-test-utils/unidriver').UniDriver;
    clickOverlay: () => Promise<void>;
    clickCloseButton: () => Promise<void>;
    closeButtonExists: () => Promise<boolean>;
  }
}
