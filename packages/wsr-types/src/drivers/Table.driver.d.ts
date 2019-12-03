declare namespace __WSRTests {
  interface TableDriver<T> extends DataTableDriver {
    element: T;
    getRowCheckboxDriver: (index: number) => CheckboxDriver;
    getBulkSelectionCheckboxDriver: () => CheckboxDriver;
    isBulkSelectionDisabled: () => boolean;
    isRowSelectionDisabled: (index: number) => boolean;
    /**
     * @deprecated
     */
    clickRowChecbox: (index: number) => void;
    clickRowCheckbox: (index: number) => void;
    clickBulkSelectionCheckbox: () => void;
    isRowSelected: (index: number) => boolean;
    getBulkSelectionState: () => "ALL" | "SOME" | "NONE"; // TODO: switch to infer
    getTitlebar: () => HTMLElement;
  }
}
