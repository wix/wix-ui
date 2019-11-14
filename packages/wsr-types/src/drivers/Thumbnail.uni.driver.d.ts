declare namespace __WSRTests {
  interface ThumbnailUniDriver extends BaseUniDriver {
    getTitle: () => Promise<string>;
    getDescription: () => Promise<string>;
    getSelectedIcon: () => import("wix-ui-test-utils/unidriver").UniDriver;
    getBackgroundImage: () => import("wix-ui-test-utils/unidriver").UniDriver;
    isSelected: () => Promise<boolean>;
    isDisabled: () => Promise<boolean>;
    getImage: () => import("wix-ui-test-utils/unidriver").UniDriver;
    getWidth: () => Promise<string>;
    getHeight: () => Promise<string>;
  }
}
