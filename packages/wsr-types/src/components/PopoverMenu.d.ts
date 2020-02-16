declare namespace __WSR {
  namespace PopoverMenu {
    export interface PopoverMenuProps {
      dataHook?: string;
      size?: PopoverMenuSize;
      placement?: PopoverMenuPlacement;
      buttonTheme?: PopoverMenuButtonTheme;
      buttonHeight?: PopoverMenuHeight;
      maxWidth?: string | number;
      appendToParent?: boolean;
      appendTo?: any; // TODO: replace with TooltipProps['appendTo']
      zIndex?: number;
      showArrow?: boolean;
      onShow?: () => void;
      onHide?: () => void;
      moveBy?: { x?: number; y?: number };
    }

    export class PopoverMenu extends React.Component<PopoverMenuProps> {}

    export type PopoverMenuSize = "normal" | "large";
    export type PopoverMenuPlacement = "top" | "right" | "bottom" | "left";
    export type PopoverMenuButtonTheme =
      | "icon-greybackground"
      | "icon-standard"
      | "icon-standardsecondary"
      | "icon-white"
      | "icon-whitesecondary";
    export type PopoverMenuHeight = "small" | "medium" | "large";
  }
}

declare module "wix-style-react" {
  export import PopoverMenu = __WSR.PopoverMenu.PopoverMenu;
  export import PopoverMenuProps = __WSR.PopoverMenu.PopoverMenuProps;
}

declare module "wix-style-react/PopoverMenu" {
  export interface PopoverMenuProps
    extends __WSR.PopoverMenu.PopoverMenuProps {}
  export default __WSR.PopoverMenu.PopoverMenu;
}
