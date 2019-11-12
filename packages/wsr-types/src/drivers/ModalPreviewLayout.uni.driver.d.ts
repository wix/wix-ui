declare namespace __WSRTests {
  interface ModalPreviewLayoutUniDriver extends BaseUniDriver {
    clickOverlay: () => Promise<void>;
    getPreviewTitle: () => import('wix-ui-test-utils/unidriver').UniDriver;
    getPreviewActions: () => import('wix-ui-test-utils/unidriver').UniDriver;
    getPreviewContent: () => import('wix-ui-test-utils/unidriver').UniDriver;
    clickClose: () => Promise<void>;
  }
}
