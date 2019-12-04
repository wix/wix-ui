declare namespace __WSRTests {
  interface TableActionCellDriver<T> extends BaseDriver {
    element: () => T;
    exists: () => boolean;
    getPrimaryActionButtonDriver: () => DeprecatedButtonDriver;
    clickPrimaryActionButton: () => void;
    getIsPrimaryActionButtonDisabled: () => boolean;
    getVisibleActionsCount: () => number;
    getHiddenActionsCount: () => number;
    getVisibleActionTooltipDriver: (action: number) => any; // TODO: replace with TooltipDriver
    getVisibleActionByDataHookTooltipDriver: (dataHook: string) => any; // TODO: replace with TooltipDriver
    getVisibleActionButtonDriver: (index: number) => DeprecatedButtonDriver;
    getVisibleActionByDataHookButtonDriver: (
      dataHook: string
    ) => DeprecatedButtonDriver;
    getHiddenActionsPopoverMenuDriver: () => any; // TODO: replace with PopoverMenuDriver
    clickVisibleAction: (actionIndex: number) => void;
    clickVisibleActionByDataHook: (actionDataHook: string) => void;
    clickPopoverMenu: () => void;
    clickHiddenAction: (actionIndex: number) => void;
    clickHiddenActionByDataHook: (actionDataHook: string) => void;
  }
}
