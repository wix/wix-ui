declare namespace __WSRTests {
  interface EditableTitleUniDriver extends BaseUniDriver {
    getInput: InputDriver;
    getHeadingText: (idx: number) => Promise<string>;
    clickHeading: (idx: number) => Promise<void>;
  }
}
