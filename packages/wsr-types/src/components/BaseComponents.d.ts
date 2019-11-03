declare namespace __WSR {
  namespace BaseComponents {
    export interface WixComponentProps {
      dataHook?: string;
      styles?: string;
    }

    export class WixComponent<
      T extends WixComponentProps = {}
    > extends React.PureComponent<T> {}

    export interface EllipsisHOCProps {
      ellipsis?: boolean;
      appendTo?: import('wix-ui-core/popover').AppendTo;
      flip?: boolean;
      fixed?: boolean;
      placement?: import('wix-ui-core/popover').Placement;
      timeout?: number;
      maxWidth?: string | number;
      zIndex?: number;
      hideDelay?: number;
      showDelay?: number;
    }
  }
}
