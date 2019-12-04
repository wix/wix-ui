declare namespace __WSRTests {
  interface MultiSelectDriver
    extends __WSR.BaseComponents.OmitPolyfill<
      InputWithOptionsDriver,
      "driver"
    > {
    driver: {
      getMaxHeight: () => string;
      clickOnInputWrapper: () => void;
      inputWrapperHasFocus: () => boolean;
      inputWrapperHasError: () => boolean;
      inputWrapperIsDisabled: () => boolean;
      numberOfTags: () => number;
      customSuffixExists: () => HTMLElement;
      getTagLabelAt: (index: number) => string;
      getTagDriverByTagId: (tagId: string) => TagDriver;
    } & Pick<InputWithOptionsDriver, "driver">;
  }
}
