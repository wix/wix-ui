declare namespace __WSR {
  namespace DropdownBase {
    export interface DropdownBaseProps {
      dataHook?: string;
      open?: boolean;
      placement?: string; // TODO: replace with PopoverProps['placement']
      appendTo?: string | React.ReactNode;
      showArrow?: boolean;
      onClickOutside?: () => void;
      onMouseEnter?: () => void;
      onMouseLeave?: () => void;
      onSelect?: (option: DropdownLayout.DropdownLayoutValueOption) => void;
      dynamicWidth?: boolean;
      minWidth?: number;
      maxWidth?: number;
      maxHeight?: number | string;
      children?: DropdownBaseChildrenFn;
      options?: DropdownLayout.DropdownLayoutProps["options"];
      selectedId?: string | number;
      overflow?: string;
      tabIndex?: number;
      initialSelectedId?: string | number;
      zIndex?: number;
      moveBy?: { x?: number; y?: number };
      flip?: boolean;
      fixed?: boolean;
    }

    export class DropdownBase extends React.PureComponent<DropdownBaseProps> {}

    export type DropdownBaseChildrenFn = React.ReactNode | ChildrenFnArgs;
    export type ChildrenFnArgs = (data: {
      open: () => void;
      close: (e: React.SyntheticEvent) => void;
      toggle: () => void;
      delegateKeyDown: React.KeyboardEventHandler;
      selectedOption: DropdownLayout.DropdownLayoutValueOption;
    }) => React.ReactNode;
  }
}

declare module "wix-style-react" {
  export import DropdownBase = __WSR.DropdownBase.DropdownBase;
  export import DropdownBaseProps = __WSR.DropdownBase.DropdownBaseProps;
}

declare module "wix-style-react/DropdownBase" {
  export type DropdownBaseProps = __WSR.DropdownBase.DropdownBaseProps;
  export default __WSR.DropdownBase.DropdownBase;
}
