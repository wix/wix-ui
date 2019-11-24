declare namespace __WSRTests {
  interface SegmentedToggleUniDriver extends BaseUniDriver {
    selectChild: (hook: string) => Promise<void>;
    isSelected: (hook: string) => Promise<boolean>;
  }
}
