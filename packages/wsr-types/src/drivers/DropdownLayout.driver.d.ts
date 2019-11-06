declare namespace __WSRTests {
  export interface DropdownLayoutDriver extends BaseDriver {
    classes: () => string;
    clickAtOption: (position: number) => void;
    clickAtOptionWithValue: (value: string) => void;
    hasTheme: (theme: __WSR.DropdownLayout.DropdownLayoutTheme) => boolean;
    hasTopArrow: () => boolean;
    isDown: () => boolean;
    isLinkOption: (position: number) => boolean;
    isOptionADivider: (position: number) => boolean;
    isOptionExists: (optionText: string) => boolean;
    isOptionHovered: (position: number) => boolean;
    isOptionSelected: (position: number) => boolean;
    isOptionHoveredWithGlobalClassName: (position: number) => boolean;
    isOptionSelectedWithGlobalClassName: (position: number) => boolean;
    isOptionHeightSmall: (position: number) => boolean;
    isOptionHeightBig: (position: number) => boolean;
    isShown: () => boolean;
    isUp: () => boolean;
    mouseClickOutside: () => void;
    mouseEnter: () => void;
    mouseEnterAtOption: (position: number) => void;
    mouseLeave: () => void;
    mouseLeaveAtOption: (position: number) => void;
    /** @deprecated Use optionDriver*/
    optionAt: (position: number) => Node;
    /** @deprecated This should be a private method since the hook include internal parts ('dropdown-divider-{id}, dropdown-item-{id})') */
    optionByHook: (hook: string) => DropdownLayoutOptionDriver;
    optionById: (optionId: string | number) => DropdownLayoutOptionDriver;
    optionContentAt: (position: number) => string;
    optionDriver: (option: HTMLElement) => DropdownLayoutOptionDriver;
    options: () => DropdownLayoutOptionDriver[];
    optionsContent: () => string[];
    markedOption: () => string | null;
    optionsLength: () => number;
    /** @deprecated should be private */
    optionsScrollTop: () => number;
    pressDownKey: () => void;
    pressUpKey: () => void;
    pressEnterKey: () => void;
    pressSpaceKey: () => void;
    pressTabKey: () => void;
    pressEscKey: () => void;
    tabIndex: () => number;
  }

  export interface DropdownLayoutOptionDriver {
    element: () => HTMLElement;
    mouseEnter: () => void;
    mouseLeave: () => void;
    isHovered: () => boolean;
    isSelected: () => boolean;
    isHoveredWithGlobalClassName: () => boolean;
    isSelectedWithGlobalClassName: () => boolean;
    content: () => string;
    click: () => void;
    isDivider: () => boolean;
    isDisabled: () => boolean;
  }
}
