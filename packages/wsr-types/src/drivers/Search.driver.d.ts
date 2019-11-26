declare namespace __WSRTests {
  interface SearchDriver
    extends __WSR.BaseComponents.OmitPolyfill<
      InputWithOptionsDriver,
      "driver"
    > {
    driver: InputWithOptionsDriver["driver"] & {
      isExpandable: () => boolean;
      isCollapsed: () => boolean;
    };
  }
}
