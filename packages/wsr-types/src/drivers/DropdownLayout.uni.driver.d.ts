declare namespace __WSRTests {
  interface DropdownLayoutUniDriver extends BaseUniDriver {
    /** @deprecated should be private */
    classes: (name: string) => Promise<any>;
    clickAtOption: (index: number) => Promise<void>;
    clickAtOptionWithValue: (value: string) => Promise<void>;
    hasTheme: (
      theme: __WSR.DropdownLayout.DropdownLayoutTheme
    ) => Promise<boolean>;
    hasTopArrow: () => Promise<boolean>;
    isDown: () => Promise<boolean>;
    isLinkOption: (position: number) => Promise<boolean>;
    isOptionADivider: (position: number) => Promise<boolean>;
    isOptionExists: (optionText: string) => Promise<boolean>;
    isOptionHovered: (index: number) => Promise<boolean>;
    isOptionSelected: (index: number) => Promise<boolean>;
    isOptionSelectedWithGlobalClassName: (position: number) => Promise<boolean>;
    isOptionHoveredWithGlobalClassName: (position: number) => Promise<boolean>;
    isOptionHeightSmall: (position: number) => Promise<boolean>;
    isOptionHeightBig: (position: number) => Promise<boolean>;
    isShown: () => Promise<boolean>;
    isUp: () => Promise<boolean>;
    mouseEnter: () => Promise<void>;
    mouseEnterAtOption: (position: number) => Promise<void>;
    mouseLeave: () => Promise<void>;
    mouseClickOutside: () => boolean;
    mouseLeaveAtOption: (position: number) => Promise<void>;
    /** @deprecated Use optionDriver*/
    optionAt: () => Promise<any>;
    /** @deprecated This should be a private method since the hook include internal parts ('dropdown-divider-{id}, dropdown-item-{id})') */
    optionByHook: (hook: string) => Promise<DropdownLayoutOptionUniDriver>;
    optionById: (
      optionId: string | number
    ) => Promise<DropdownLayoutOptionUniDriver>;
    optionContentAt: (position: number) => Promise<string>;
    optionDriver: (
      option: import('wix-ui-test-utils/unidriver').UniDriver<any>
    ) => DropdownLayoutOptionUniDriver;
    options: () => Promise<DropdownLayoutOptionUniDriver[]>;
    optionsContent: () => Promise<string[]>;
    markedOption: () => Promise<string | null>;
    optionsLength: () => Promise<number>;
    /** @deprecated should be private */
    optionsScrollTop: () => Promise<number>;
    pressDownKey: () => Promise<void>;
    pressUpKey: () => Promise<void>;
    pressEnterKey: () => Promise<void>;
    pressSpaceKey: () => Promise<void>;
    pressTabKey: () => Promise<void>;
    pressEscKey: () => Promise<void>;
    tabIndex: () => Promise<number>;
  }

  export interface DropdownLayoutOptionUniDriver {
    element: () => import('wix-ui-test-utils/unidriver').UniDriver<any>;
    mouseEnter: () => Promise<void>;
    mouseLeave: () => Promise<void>;
    isHovered: () => Promise<boolean>;
    isSelected: () => Promise<boolean>;
    isHoveredWithGlobalClassName: () => Promise<boolean>;
    isSelectedWithGlobalClassName: () => Promise<boolean>;
    content: () => Promise<string>;
    click: () => Promise<void>;
    isDivider: () => Promise<boolean>;
    isDisabled: () => Promise<boolean>;
  }
}
