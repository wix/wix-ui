declare namespace __WSRTests {
  interface MultiSelectUniDriver
    extends __WSR.BaseComponents.OmitPolyfill<
      InputWithOptionsUniDriver,
      "driver"
    > {
    driver: {
      getMaxHeight: () => Promise<any>;
      clickOnInputWrapper: () => Promise<void>;
      inputWrapperHasFocus: () => Promise<any>;
      inputWrapperHasError: () => Promise<any>;
      inputWrapperIsDisabled: () => Promise<any>;
      numberOfTags: () => Promise<number>;
      getTagLabelAt: (index: number) => Promise<string>;
      getTagDriverByTagId: (
        tagId: string
      ) => Promise<
        TagUniDriver & {
          isCloseButtonSmall: () => Promise<boolean>;
          isCloseButtonLarge: () => Promise<boolean>;
          getTextSize: () => __WSR.Text.TextSize;
          getTextWeight: () => __WSR.Text.TextWeight;
          isClickable: () => Promise<boolean>;
        }
      >;
      customSuffixExists: () => Promise<any>;
    } & Pick<InputWithOptionsUniDriver, "driver"> &
      BaseUniDriver;
  }
}
