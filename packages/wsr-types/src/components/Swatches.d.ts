declare namespace __WSR {
  namespace Swatches {
    export interface SwatchesProps {
      dataHook?: string;
      colors?: (object|string)[],
      selected?: string;
      onClick?: string | object;
      size?: 'small' | 'medium';
      showClear?: boolean;
      showClearMessage?: React.ReactNode;
      onAdd?: Function;
      onChange?: Function;
      onCancel?: Function;
      showAddButton?: boolean;
      addButtonMessage?: string;
      addButtonIconSize?: 'small' | 'medium';
      columns?: number;
      gap?: number;
    }

    export class Swatches extends React.PureComponent<SwatchesProps> {}
  }
}

declare module 'wix-style-react' {
  export import Swatches = __WSR.Swatches.Swatches;
  export import SwatchesProps = __WSR.Swatches.SwatchesProps;
}

declare module 'wix-style-react/Swatches' {
  export interface SwatchesProps extends __WSR.Swatches.SwatchesProps {}
  export default __WSR.Swatches.Swatches;
}
