declare namespace __WSRTests {
  interface InputDriver extends BaseDriver {
    // TODO: can trigger be more strict?
    trigger: (
      trigger: string,
      event: import('react-dom/test-utils').SyntheticEventData
    ) => void;
    focus: (options: FocusOptions) => void;
    blur: () => void;
    getName: () => string | null;
    getMaxLength: () => string | null;
    getType: () => string | null;
    keyDown: (
      key: import('react-dom/test-utils').SyntheticEventData['key']
    ) => void;
    click: () => void;
    clickSuffix: () => void;
    clickUnit: () => void;
    clickMagnifyingGlass: () => void;
    clickCustomAffix: () => void;
    clickClear: () => void;
    clickIconAffix: () => void;
    clickMenuArrow: () => void;
    mouseOver: () => void;
    mouseOut: () => void;
    clearText: () => void;
    enterText: (text: string) => void;
    getValue: () => string;
    getText: () => string;
    getPlaceholder: () => string;
    getDefaultValue: () => string;
    getTabIndex: () => number;
    getReadOnly: () => boolean;
    getDisabled: () => boolean;
    getTextOverflow: () => string;
    getAriaLabel: () => string | null;
    getAriaControls: () => string | null;
    getAriaDescribedby: () => string | null;
    getAutocomplete: () => string | null;
    getRequired: () => boolean;
    hasPrefix: () => boolean;
    hasPrefixClass: () => boolean;
    hasSuffix: () => boolean;
    hasSuffixClass: () => boolean;
    hasSuffixesClass: () => boolean;
    prefixComponentExists: (style: string) => boolean;
    suffixComponentExists: (style: string) => boolean;
    isMenuArrowLast: () => boolean;
    hasExclamation: () => boolean;
    isNarrowError: () => boolean;
    hasHelp: () => boolean;
    hasError: () => boolean;
    hasWarning: () => boolean;
    getTooltipElement: () => HTMLElement;
    hasLoader: () => ReturnType<HTMLInputElement['querySelector']>;
    getTooltipDataHook: () => 'input-tooltip';
    getDataHook: () => string | null;
    getUnit: () => string;
    getCustomAffix: () => string;
    hasMagnifyingGlass: () => boolean;
    hasMenuArrow: () => boolean;
    hasClearButton: () => boolean;
    isRTL: () => boolean;
    isFocusedStyle: () => boolean;
    isHoveredStyle: () => boolean;
    isDisabled: () => boolean;
    isOfStyle: (style: __WSR.Input.InputTheme) => boolean;
    isOfSize: (size: __WSR.Input.InputSize) => boolean;
    getSize: () => string | null;
    isFocus: () => boolean;
    startComposing: () => void;
    endComposing: () => void;
    getCursorLocation: () => number;
    getRootElementClasses: () => string;
    getInputElementClasses: () => string;
    hasRightBorderRadius: () => boolean;
    hasLeftBorderRadius: () => boolean;
    isCustomInput: () => boolean;
  }
}
