declare namespace __WSRTests {
  interface SidebarHeaderUniDriver extends BaseUniDriver {
    getTitle: () => Promise<string>;
    getSubtitle: () => Promise<string>;
    getChildren: () => import("wix-ui-test-utils/unidriver").UniDriver;
  }
}
