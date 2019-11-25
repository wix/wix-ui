declare namespace __WSRTests {
  interface DropdownBaseUniDriver extends BaseUniDriver {
    clickTargetElement: (dataHook: string) => Promise<void>;
    hoverTargetElement: (dataHook: string) => Promise<void>;
    isDropdownShown: () => Promise<boolean>;
    selectOption: (index: string | number) => Promise<void>;
    clickOutside: () => boolean;
    optionsCount: () => Promise<number>;
    mouseEnter: () => Promise<void>;
    mouseLeave: () => Promise<void>;
  }
}
