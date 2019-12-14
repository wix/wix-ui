declare namespace __WSR {
  namespace Table {
    export interface TableProps extends UsedDataTableProps {
      dataHook?: string;
      onSelectionChanged?: OnSelectionChangedFn;
      showSelection?: boolean;
      hideBulkSelectionCheckbox?: boolean;
      selectedIds?: string[] | number[];
      selectionDisabled?: boolean;
      deselectRowsByDefault?: boolean;
      withWrapper?: boolean;
      onSortClick?(colData: TableColumn, colNum: number): void;
      totalSelectableCount?: number;
      columns: TableColumn[];
    }

    export class Table extends React.Component<TableProps> {
      static ToolbarContainer: typeof ToolbarContainer;
      static Titlebar: typeof Titlebar;
      static Content: typeof Content;
      static EmptyState: typeof EmptyState;
      static BulkSelectionCheckbox: typeof BulkSelectionCheckbox;
    }

    const ToolbarContainer: React.SFC;
    const Titlebar: React.SFC<{ dataHook?: string }>;
    const Content: React.SFC<{
      titleBarVisible?: boolean;
      dataHook?: string;
    }>;
    const EmptyState: React.SFC<EmptyState.EmptyStateProps>;
    const BulkSelectionCheckbox: React.SFC<{ dataHook: string }>;

    export type TableColumn = DataTable.DataTableColumn;

    export type OnSelectionChangedFn = (
      selectedIds: TableProps["selectedIds"] | null,
      change:
        | {
            type: "SINGLE_TOGGLE";
            id: string;
            value: boolean;
            origin: string;
          }
        | {
            type: "ALL" | "NONE";
            origin: string;
          }
    ) => void;

    export type UsedDataTableProps = Pick<
      DataTable.DataTableProps,
      | "allowMultiDetailsExpansion"
      | "dynamicRowClass"
      | "isRowHighlight"
      | "hasMore"
      | "hideHeader"
      | "id"
      | "infiniteScroll"
      | "itemsPerPage"
      | "loader"
      | "loadMore"
      | "onRowClick"
      | "onMouseEnterRow"
      | "onMouseLeaveRow"
      | "useWindow"
      | "scrollElement"
      | "rowVerticalPadding"
      | "rowDetails"
      | "rowDataHook"
      | "rowClass"
      | "showHeaderWhenEmpty"
      | "showLastRowDivider"
      | "virtualized"
      | "virtualizedTableHeight"
      | "virtualizedLineHeight"
      | "virtualizedListRef"
      | "width"
      | "skin"
      | "data"
    >;
  }
}

declare module "wix-style-react" {
  export import Table = __WSR.Table.Table;
  export import TableProps = __WSR.Table.TableProps;
}

declare module "wix-style-react/Table" {
  export interface TableProps extends __WSR.Table.TableProps {}
  export default __WSR.Table.Table;
}
