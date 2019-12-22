declare namespace __WSRTests {
  interface NumberInputUniDriver extends InputUniDriver {
    clickOnIncrement: () => Promise<void>;
    clickOnDecrement: () => Promise<void>;
  }
}
