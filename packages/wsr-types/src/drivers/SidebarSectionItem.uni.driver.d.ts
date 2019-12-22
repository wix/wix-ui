declare namespace __WSRTests {
  interface SidebarSectionItemUniDriver extends BaseUniDriver {
    getText: () => Promise<string>;
    getPrefix: () => import("wix-ui-test-utils/unidriver").UniDriver;
    getSuffix: () => import("wix-ui-test-utils/unidriver").UniDriver;
    hover: () => Promise<void>;
  }
}
