declare namespace __WSRTests {
  interface InputUniDriver extends BaseUniDriver {
    click: () => Promise<void>;
    getInputElementClasses: () => Promise<string>;
    suffixComponentExists: (style: string) => Promise<boolean>;
    getRootElementClasses: () => Promise<string>;
    getAriaDescribedby: () => Promise<string | null>;
    getAriaLabel: () => Promise<string | null>;
    getName: () => Promise<string | null>;
    getMaxLength: () => Promise<string | null>;
    getType: () => Promise<string | null>;
    getAriaControls: () => Promise<string | null>;
    clickIconAffix: () => Promise<void>;
    clickCustomAffix: () => Promise<void>;
    isMenuArrowLast: () => Promise<boolean>;
    hasSuffixesClass: () => Promise<boolean>;
    hasSuffixClass: () => Promise<boolean>;
    hasSuffix: () => Promise<boolean>;
    hasPrefixClass: () => Promise<boolean>;
    prefixComponentExists: (style: string) => Promise<boolean>;
    hasPrefix: () => Promise<boolean>;
    hasClearButton: () => Promise<boolean>;
    clickClear: () => Promise<void>;
    getValue: () => Promise<string>;
    getText: () => Promise<string>;
    getPlaceholder: () => Promise<string | null>;
    isOfStyle: (style: __WSR.Input.InputTheme) => Promise<boolean>;
    isOfSize: (size: __WSR.Input.InputSize) => Promise<boolean>;
    getSize: () => Promise<__WSR.Input.InputSize | null>;
    isDisabled: () => Promise<boolean>;
    isHoveredStyle: () => Promise<boolean>;
    isFocusedStyle: () => Promise<boolean>;
    getRequired: () => Promise<any>;
    enterText: (value: string) => Promise<void>;
    getAutocomplete: () => Promise<string | null>;
    getDefaultValue: () => Promise<any>;
    getUnit: () => Promise<string>;
    getTabIndex: () => Promise<any>;
    isCustomInput: () => Promise<boolean>;
    getReadOnly: () => Promise<any>;
    getDisabled: () => Promise<any>;
    getTextOverflow: () => Promise<string>;
    hasExclamation: () => Promise<boolean>;
    hasError: () => Promise<boolean>;
    hasWarning: () => Promise<boolean>;
    hasLoader: () => Promise<boolean>;
    focus: () => Promise<void>;
    blur: () => Promise<void>;
    keyUp: () => Promise<void>;
    keyDown: (
      eventData: import('react-dom/test-utils').SyntheticEventData
    ) => Promise<void>;
    paste: () => Promise<void>;
    trigger(value: 'focus'): Promise<void>;
    trigger(value: 'blur'): Promise<void>;
    trigger(value: 'keyUp'): Promise<void>;
    trigger(value: 'paste'): Promise<void>;
    trigger(value: 'change'): Promise<void>;
    trigger(
      value: 'keyDown',
      event: import('react-dom/test-utils').SyntheticEventData
    ): Promise<void>;
    isFocus: () => Promise<boolean>;
    hasHelp: () => Promise<boolean>;
    clickUnit: () => Promise<void>;
    hasMagnifyingGlass: () => Promise<boolean>;
    clickMagnifyingGlass: () => Promise<void>;
    clickMenuArrow: () => Promise<void>;
    hasMenuArrow: () => Promise<boolean>;
    isNarrowError: () => Promise<boolean>;
    isRTL: () => Promise<boolean>;
    getCursorLocation: () => Promise<any>;
    clearText: () => Promise<void>;
    clickOutside: () => boolean;
  }
}
