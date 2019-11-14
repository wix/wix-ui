declare namespace __WSRTests {
  interface FillPreviewUniDriver extends BaseUniDriver {
    isSelected: () => Promise<boolean>;
  }
}
