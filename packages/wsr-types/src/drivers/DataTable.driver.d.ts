declare namespace __WSRTests {
  interface DataTableDriver extends BaseDriver {
    getRow: (rowIndex: number) => HTMLTableRowElement | undefined;
    getRowsCount: () => number;
    getRowsWithClassCount: (className: string) => number;
    getRowsWithDataHook: (dataHookName: string) => NodeListOf<HTMLElement>;
    getRowWithDataHook: (dataHookName: string) => HTMLElement;
    getRowText: (index: number) => string[];
    getRowClasses: (index: number) => string[];
    getHeaderCell: (index: number) => HTMLTableHeaderCellElement;
    getHeaderCellStyle: (index: number) => CSSStyleDeclaration;
    getHeaderCellWidth: (index: number) => string | null;
    getCell: (rowIndex: number, cellIndex: number) => HTMLTableDataCellElement;
    getCellStyle: (rowIndex: number, colIndex: number) => CSSStyleDeclaration;
    getCellWidth: (rowIndex: number, colIndex: number) => string | null;
    isRowClickable: (index: number) => boolean;
    isRowAnimated: (index: number) => boolean;
    getTitles: () => string[];
    isDisplayingNothing: () => boolean;
    isDisplayingHeaderOnly: () => boolean;
    isDisplayingHeader: () => boolean;
    hasChildWithId: (id: string) => boolean;
    clickRow: (
      index: number,
      eventData?: import("react-dom/test-utils").SyntheticEventData
    ) => void;
    mouseEnterRow: (
      index: number,
      eventData?: import("react-dom/test-utils").SyntheticEventData
    ) => void;
    mouseLeaveRow: (
      index: number,
      eventData?: import("react-dom/test-utils").SyntheticEventData
    ) => void;
    hasRowDetails: (index: number) => number;
    getRowDetailsText: (index: number) => string;
    hasSortableTitle: (index: number) => boolean;
    hasInfoIcon: (index: number) => boolean;
    hasSortDescending: (index: number) => boolean;
    clickSort: (
      index: number,
      eventData?: import("react-dom/test-utils").SyntheticEventData
    ) => void;
    getRowDetails: (index: number) => HTMLTableDataCellElement;
  }
}
