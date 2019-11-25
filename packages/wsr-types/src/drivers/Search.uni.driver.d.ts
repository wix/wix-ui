declare namespace __WSRTests {
  interface SearchUniDriver extends Omit<InputWithOptionsUniDriver, "driver"> {
    driver: InputWithOptionsUniDriver["driver"] & {
      isExpandable: () => Promise<boolean>;
      isCollapsed: () => Promise<boolean>;
    };
  }
}
