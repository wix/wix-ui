declare namespace __WSRTests {
  interface SegmentedToggleUniDriver extends BaseUniDriver {
    selectChild: (hook: string | number) => Promise<void>;
    isSelected: (hook: string | number) => Promise<boolean>;
  }
}
