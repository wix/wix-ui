declare namespace __WSR {
  namespace TableToolbar {
    export interface TableToolbarProps {
      children: React.ReactNode;
    }

    interface ItemGroupProps {
      children: React.ReactNode;
      position?: string;
    }

    interface ItemProps {
      children: React.ReactNode;
      layout?: string;
    }

    interface TitleProps {
      children: React.ReactNode;
      dataHook?: string;
    }

    interface LabelProps {
      children: React.ReactNode;
    }

    interface DividerProps {}

    interface SelectedCountProps {
      children: React.ReactNode;
      dataHook?: string;
    }

    const ItemGroup: React.SFC<ItemGroupProps>;
    const Item: React.SFC<ItemProps>;
    const Title: React.SFC<TitleProps>;
    const Label: React.SFC<LabelProps>;
    const Divider: React.SFC<DividerProps>;
    const SelectedCount: React.SFC<SelectedCountProps>;

    export const TableToolbar: React.SFC<TableToolbarProps> & {
      ItemGroup: typeof ItemGroup;
      Item: typeof Item;
      Title: typeof Title;
      Label: typeof Label;
      Divider: typeof Divider;
      SelectedCount: typeof SelectedCount;
    };
  }
}

declare module 'wix-style-react' {
  export import TableToolbar = __WSR.TableToolbar.TableToolbar;
  export import TableToolbarProps = __WSR.TableToolbar.TableToolbarProps;
}

declare module 'wix-style-react/TableToolbar' {
  export import TableToolbar = __WSR.TableToolbar.TableToolbar;
  export import TableToolbarProps = __WSR.TableToolbar.TableToolbarProps;
}
