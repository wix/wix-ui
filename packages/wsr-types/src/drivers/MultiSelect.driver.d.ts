declare namespace __WSRTests {
  interface MultiSelectDriver
    extends __WSR.BaseComponents.OmitPolyfill<
      InputWithOptionsDriver,
      "driver"
      > {
    driver: InputWithOptionsDriver["driver"] & {
      getMaxHeight: () => string;
      clickOnInputWrapper: () => void;
      inputWrapperHasFocus: () => boolean;
      inputWrapperHasError: () => boolean;
      inputWrapperIsDisabled: () => boolean;
      numberOfTags: () => number;
      customSuffixExists: () => HTMLElement;
      getTagLabelAt: (index: number) => string;
      pressCommaKey: () => void;
      getTagDriverByTagId: (tagId: string) => TagDriver;
    };
  }
}
