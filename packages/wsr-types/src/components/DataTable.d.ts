declare namespace __WSR {
  namespace DataTable {
    export interface DataTableProps {
      dataHook?: string;
      id?: string;
      data?: object[];
      columns: DataTableColumn[];
      showHeaderWhenEmpty?: boolean;
      rowDataHook?: string | DataTableRowDataHookFn;
      rowClass?: string;
      dynamicRowClass?: (rowData: any, rowNum: number) => string;
      isRowSelected?: (rowData: any, rowNum: number) => boolean;
      isRowHighlight?: (rowData: any, rowNum: number) => boolean;
      onRowClick?: (rowData: any, rowNum: number) => void;
      onMouseEnterRow?: (rowData: any, rowNum: number) => void;
      onMouseLeaveRow?: (rowData: any, rowNum: number) => void;
      onSortClick?: (column: DataTableColumn, colNum: number) => void;
      infiniteScroll?: boolean;
      itemsPerPage?: number;
      width?: string;
      skin?: DataTableSkin;
      loadMore?: () => void;
      hasMore?: boolean;
      loader?: React.ReactNode;
      useWindow?: boolean;
      scrollElement?: HTMLElement;
      rowVerticalPadding?: DataTableRowVerticalPadding;
      /**
       * @deprecated
       */
      thPadding?: string;
      /**
       * @deprecated
       */
      thHeight?: string;
      /**
       * @deprecated
       */
      thFontSize?: string;
      /**
       * @deprecated
       */
      thBorder?: string;
      /**
       * @deprecated
       */
      thColor?: string;
      /**
       * @deprecated
       */
      thOpacity?: string;
      /**
       * @deprecated
       */
      thBoxShadow?: string;
      /**
       * @deprecated
       */
      thLetterSpacing?: string;
      rowDetails?: (rowData: any, rowNum: number) => React.ReactNode;
      allowMultiDetailsExpansion?: boolean;
      hideHeader?: boolean;
      showLastRowDivider?: boolean;
      virtualized?: boolean;
      virtualizedTableHeight?: number;
      virtualizedLineHeight?: number;
      virtualizedListRef?: React.LegacyRef<
        import("react-window").VariableSizeList
      >;
      selectedRowsIds?: (string | number)[];
    }

    export class DataTable extends React.Component<DataTableProps> {}

    export type DataTableColumnAlign = "start" | "center" | "end";
    export type DataTableRowDataHookFn = (
      rowData: any,
      rowNum: number
    ) => string;
    export type DataTableSkin = "standard" | "neutral";
    export type DataTableRowVerticalPadding = "medium" | "large";
    export type DataTableColumn = {
      title: React.ReactNode;
      render: (row: any, rowNum: number) => React.ReactNode;
      width?: string;
      important?: boolean;
      sortable?: boolean;
      sortDescending?: boolean;
      style?: React.CSSProperties;
      infoTooltipProps?: any; // TODO: replace with BaseComponents.OmitPolyfill<TooltipProps, 'dataHook' | 'moveBy'>
      align?: DataTableColumnAlign;
    };
  }
}

declare module "wix-style-react" {
  export import DataTable = __WSR.DataTable.DataTable;
  export import DataTableProps = __WSR.DataTable.DataTableProps;
}

declare module "wix-style-react/DataTable" {
  export interface DataTableProps extends __WSR.DataTable.DataTableProps {}
  export default __WSR.DataTable.DataTable;
}
