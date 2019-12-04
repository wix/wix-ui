declare namespace __WSRTests {
  interface MultiSelectCheckboxUniDriver
    extends __WSR.BaseComponents.OmitPolyfill<
      InputWithOptionsUniDriver,
      "driver"
    > {
    driver: {
      getNumOfLabels: () => Promise<number>;
      getLabels: () => Promise<string[]>;
      getLabelAt: (index: number) => Promise<string>;
    } & Pick<InputWithOptionsUniDriver, "driver"> &
      BaseUniDriver;
  }
}
