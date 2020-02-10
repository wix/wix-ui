declare namespace __WSR {
  namespace Grid {
    export interface ContainerProps {
      fluid?: boolean;
      className?: string;
      stretchVertically?: boolean;
    }

    export interface ColumnsProps {
      className?: string;
      rtl?: boolean;
      stretchViewsVertically?: boolean;
      dataHook?: string;
    }

    export interface ColProps {
      className?: string;
      span?: string | number;
      rtl?: boolean;
      xs?: string | number;
      sm?: string | number;
      md?: string | number;
      lg?: string | number;
      xl?: string | number;
      dataHook?: string;
    }

    export interface AutoAdjustedColumnsProps {}

    export const Container: React.SFC<ContainerProps>;
    export const RawContainer: React.SFC<ContainerProps>;
    export class Columns extends React.Component<ColumnsProps> {}
    export class Row extends React.Component<ColumnsProps> {}
    export class Col extends React.Component<ColProps> {}
    export class AutoAdjustedColumns extends React.Component<
      AutoAdjustedColumnsProps
    > {}
    export class AutoAdjustedRow extends React.Component<
      AutoAdjustedColumnsProps
    > {}
  }
}

declare module 'wix-style-react' {
  export import Container = __WSR.Grid.Container;
  export import ContainerProps = __WSR.Grid.ContainerProps;

  export import RawContainer = __WSR.Grid.RawContainer;
  export import RawContainerProps = __WSR.Grid.ContainerProps;

  export import Columns = __WSR.Grid.Columns;
  export import ColumnsProps = __WSR.Grid.ColumnsProps;

  export import Row = __WSR.Grid.Row;
  export import RowProps = __WSR.Grid.ColumnsProps;

  export import Col = __WSR.Grid.Col;
  export import ColProps = __WSR.Grid.ColProps;

  export import AutoAdjustedColumns = __WSR.Grid.AutoAdjustedColumns;
  export import AutoAdjustedColumnsProps = __WSR.Grid.AutoAdjustedColumnsProps;

  export import AutoAdjustedRow = __WSR.Grid.AutoAdjustedRow;
  export import AutoAdjustedRowProps = __WSR.Grid.AutoAdjustedColumnsProps;
}

declare module 'wix-style-react/Grid' {
  export import Container = __WSR.Grid.Container;
  export import ContainerProps = __WSR.Grid.ContainerProps;

  export import RawContainer = __WSR.Grid.RawContainer;
  export import RawContainerProps = __WSR.Grid.ContainerProps;

  export import Columns = __WSR.Grid.Columns;
  export import ColumnsProps = __WSR.Grid.ColumnsProps;

  export import Row = __WSR.Grid.Row;
  export import RowProps = __WSR.Grid.ColumnsProps;

  export import Col = __WSR.Grid.Col;
  export import ColProps = __WSR.Grid.ColProps;

  export import AutoAdjustedColumns = __WSR.Grid.AutoAdjustedColumns;
  export import AutoAdjustedColumnsProps = __WSR.Grid.AutoAdjustedColumnsProps;

  export import AutoAdjustedRow = __WSR.Grid.AutoAdjustedRow;
  export import AutoAdjustedRowProps = __WSR.Grid.AutoAdjustedColumnsProps;
}
