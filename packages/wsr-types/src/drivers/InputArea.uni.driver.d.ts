declare namespace __WSRTests {
  interface InputAreaUniDriver extends BaseUniDriver {
    trigger: (
      trigger: keyof typeof import("react-dom/test-utils").Simulate,
      event: import("react-dom/test-utils").SyntheticEventData
    ) => Promise<void>;
    focus: () => Promise<void>;
    enterText: (text: string) => Promise<string>;
    getValue: () => Promise<string>;
    getName: () => Promise<string | null>;
    getPlaceholder: () => Promise<any>;
    getDefaultValue: () => Promise<any>;
    getRowsCount: () => Promise<any>;
    getMaxLength: () => Promise<any>;
    getTabIndex: () => Promise<any>;
    getReadOnly: () => Promise<any>;
    getResizable: () => Promise<boolean>;
    getDisabled: () => Promise<boolean>;
    getHasCounter: () => Promise<boolean>;
    getCounterValue: () => Promise<string>;
    hasExclamation: () => Promise<boolean>;
    hasError: () => Promise<boolean>;
    isFocusedStyle: () => Promise<boolean>;
    isSizeSmall: () => Promise<boolean>;
    isHoveredStyle: () => Promise<boolean>;
    isOfStyle: (style: __WSR.InputArea.InputAreaTheme) => Promise<boolean>;
    isFocus: () => Promise<boolean>;
    getStyle: () => Promise<any>;
    getAriaLabel: () => Promise<string | null>;
    getAriaControls: () => Promise<string | null>;
    getAriaDescribedby: () => Promise<string | null>;
    getTooltipDataHook: () => string;
    getTooltipElement: () => import("wix-ui-test-utils/unidriver").UniDriver;
    isErrorMessageShown: () => Promise<boolean>;
    mouseEnterErrorIndicator: () => Promise<void>;
    getErrorMessage: () => Promise<string>;
  }
}
