declare namespace __WSRTests {
  interface RangeDriver extends InputDriver {
    getInput: () => HTMLElement,
    hasInput: () => boolean,
    getLabel: () => HTMLElement,
    hasLabel: () => boolean,

  }
}
