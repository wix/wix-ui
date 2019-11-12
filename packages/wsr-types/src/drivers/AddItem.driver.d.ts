declare namespace __WSRTests {
  interface AddItemDriver<T> extends BaseDriver {
    element: () => T;
    getText: () => string;
    textExists: () => boolean;
    getTooltipDriver: () => void;
    getTooltipContent: () => string;
    click: () => void;
  }
}
