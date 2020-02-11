declare namespace __WSR {
  namespace Layout {
    export interface LayoutProps {
      dataHook?: string;
      children?: React.ReactNode;
      gap?: string | number;
      cols?: number;
      justifyItems?: string;
      alignItems?: string;
    }

    export interface CellProps {
      children?: React.ReactNode;
      span?: number;
      vertical?: boolean;
    }

    export const Layout: React.SFC<LayoutProps>;
    export const Cell: React.SFC<CellProps>;
  }
}

declare module 'wix-style-react' {
  export import Layout = __WSR.Layout.Layout;
  export import LayoutProps = __WSR.Layout.LayoutProps;

  export import Cell = __WSR.Layout.Cell;
  export import CellProps = __WSR.Layout.CellProps;
}

declare module 'wix-style-react/Layout' {
  export import Layout = __WSR.Layout.Layout;
  export import LayoutProps = __WSR.Layout.LayoutProps;

  export import Cell = __WSR.Layout.Cell;
  export import CellProps = __WSR.Layout.CellProps;
}
