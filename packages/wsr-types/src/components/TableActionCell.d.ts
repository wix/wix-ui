declare namespace __WSR {
  namespace TableActionCell {
    export interface TableActionCellProps {
      dataHook?: string;
      primaryAction?: TableActionCellPrimaryAction;
      secondaryActions?: TableActionCellSecondaryAction[];
      numOfVisibleSecondaryActions?: number;
      alwaysShowSecondaryActions?: boolean;
      popoverMenuProps?: any; // TODO: replace with PopoverMenuProps
      upgrade?: boolean;
    }

    export const TableActionCell: React.SFC<TableActionCellProps>;

    export type TableActionCellPrimaryAction = {
      text: string;
      onClick: () => void;
      theme?: "whiteblue" | "fullblue";
      disabled?: boolean;
    };

    export type TableActionCellSecondaryAction = {
      text: string;
      icon: BaseComponents.IconElement;
      onClick: () => void;
      disabled?: boolean;
      dataHook?: string;
    };
  }
}

declare module "wix-style-react" {
  export import TableActionCell = __WSR.TableActionCell.TableActionCell;
  export import TableActionCellProps = __WSR.TableActionCell.TableActionCellProps;
}

declare module "wix-style-react/TableActionCell" {
  export interface TableActionCellProps
    extends __WSR.TableActionCell.TableActionCellProps {}
  export default __WSR.TableActionCell.TableActionCell;
}
