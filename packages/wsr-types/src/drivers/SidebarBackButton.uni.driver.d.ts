declare namespace __WSRTests {
  interface SidebarBackButtonUniDriver extends BaseUniDriver {
    clickButton: () => Promise<void>;
    getButtonText: () => Promise<string>;
  }
}
