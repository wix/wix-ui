declare namespace __WSRTests {
  interface SearchUniDriver
    extends __WSR.BaseComponents.OmitPolyfill<
      InputWithOptionsUniDriver,
      "driver"
    > {
    driver: InputWithOptionsUniDriver["driver"] & {
      isExpandable: () => Promise<boolean>;
      isCollapsed: () => Promise<boolean>;
    };
  }
}
