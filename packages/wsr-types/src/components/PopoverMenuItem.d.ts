declare namespace __WSR {
  namespace PopoverMenuItem {
    export interface PopoverMenuItemProps
      extends BaseComponents.WixComponentProps {
      icon?: BaseComponents.IconElement;
      text?: React.ReactNode;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
      size?: PopoverMenuItemSize;
      disabled?: boolean;
      divider?: boolean;
    }

    export class PopoverMenuItem extends BaseComponents.WixComponent<
      PopoverMenuItemProps
    > {}

    export type PopoverMenuItemSize = 'normal' | 'large';
  }
}

declare module 'wix-style-react' {
  export import PopoverMenuItem = __WSR.PopoverMenuItem.PopoverMenuItem;
  export import PopoverMenuItemProps = __WSR.PopoverMenuItem.PopoverMenuItemProps;
}

declare module 'wix-style-react/PopoverMenuItem' {
  export interface PopoverMenuItemProps
    extends __WSR.PopoverMenuItem.PopoverMenuItemProps {}
  export default __WSR.PopoverMenuItem.PopoverMenuItem;
}
