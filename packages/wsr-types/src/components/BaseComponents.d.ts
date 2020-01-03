declare namespace __WSR {
  namespace BaseComponents {
    export interface WixComponentProps {
      dataHook?: string;
      styles?: string;
    }

    export class WixComponent<
      T extends WixComponentProps = {}
    > extends React.PureComponent<T> {}

    export type WixComponentClickOutsideEventHandler = (
      e: TouchEvent | MouseEvent
    ) => void;

    export type IconElement = React.ReactElement<any>;

    /**
     * Construct a type with the properties of T except for those in type K.
     */
    export type OmitPolyfill<T, K extends keyof any> = Pick<
      T,
      Exclude<keyof T, K>
    >;

    export interface FocusOptionsPolyfill {
      preventScroll?: boolean;
    }

    export interface EllipsisHOCProps {
      ellipsis?: boolean;
      appendTo?: Popover.PopoverProps["appendTo"];
      flip?: boolean;
      fixed?: boolean;
      placement?: Popover.PopoverProps["placement"];
      timeout?: number;
      maxWidth?: string | number;
      zIndex?: number;
      hideDelay?: number;
      showDelay?: number;
    }
  }
}
