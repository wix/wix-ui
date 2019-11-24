declare namespace __WSRTests {
  interface HighlighterDriver<T> extends BaseDriver {
    getElement: () => T;
    html: () => string;
  }
}
