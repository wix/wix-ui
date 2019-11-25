declare namespace __WSRTests {
  interface SearchDriver extends Omit<InputWithOptionsDriver, "driver"> {
    driver: InputWithOptionsDriver["driver"] & {
      isExpandable: () => boolean;
      isCollapsed: () => boolean;
    };
  }
}
