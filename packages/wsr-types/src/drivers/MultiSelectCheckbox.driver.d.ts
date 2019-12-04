declare namespace __WSRTests {
  interface MultiSelectCheckboxDriver
    extends __WSR.BaseComponents.OmitPolyfill<
      InputWithOptionsDriver,
      "driver"
    > {
    driver: {
      getNumOfLabels: () => number;
      getLabels: () => string[];
      getLabelAt: (index: number) => string;
    } & Pick<InputWithOptionsDriver, "driver">;
  }
}
