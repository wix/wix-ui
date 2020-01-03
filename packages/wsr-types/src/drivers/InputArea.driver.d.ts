declare namespace __WSRTests {
  interface InputAreaDriver<T> extends BaseDriver {
    trigger: (
      trigger: keyof typeof import("react-dom/test-utils").Simulate,
      event: import("react-dom/test-utils").SyntheticEventData
    ) => void;
    focus: () => void;
    enterText: (text: string) => void;
    getValue: () => string;
    getName: () => string;
    getPlaceholder: () => string;
    getDefaultValue: () => string;
    getRowsCount: () => number;
    getMaxLength: () => number;
    getTabIndex: () => number;
    getReadOnly: () => boolean;
    getResizable: () => boolean;
    getDisabled: () => boolean;
    getHasCounter: () => boolean;
    getCounterValue: () => string;
    hasExclamation: () => boolean;
    hasError: () => boolean;
    isFocusedStyle: () => boolean;
    isSizeSmall: () => boolean;
    isHoveredStyle: () => boolean;
    isOfStyle: (style: __WSR.InputArea.InputAreaTheme) => boolean;
    isFocus: () => boolean;
    getStyle: () => CSSStyleDeclaration;
    getAriaLabel: () => string;
    getAriaControls: () => string;
    getAriaDescribedby: () => string;
    getTooltipDataHook: () => string;
    getTooltipElement: () => T;
    isErrorMessageShown: () => boolean;
    mouseEnterErrorIndicator: () => void;
    getErrorMessage: () => string;
  }
}
