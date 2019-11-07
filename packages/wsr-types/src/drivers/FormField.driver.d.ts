declare namespace __WSRTests {
  interface FormFieldDriver extends BaseDriver {
    element: () => HTMLElement;
    getChildren: () => HTMLElement | null;
    getLabel: () => HTMLElement | null;
    isRequired: () => boolean;
    getLengthLeft: () => number | null;
    isLengthExceeded: () => boolean;
    hasTooltip: () => boolean;
    getInfoContent: () => string;
  }
}
