declare namespace __WSR {
  namespace IconButton {
    export type IconButtonProps = Button.ButtonWithAsProp<{
      className?: string;
      skin?: IconButtonSkin;
      priority?: IconButtonPriority;
      size?: IconButtonSize;
      disabled?: boolean;
      dataHook?: string;
    }>;

    export class IconButton extends React.Component<IconButtonProps> {}

    export type IconButtonSkin =
      | 'standard'
      | 'inverted'
      | 'light'
      | 'transparent'
      | 'premium';
    export type IconButtonPriority = 'primary' | 'secondary';
    export type IconButtonSize = 'tiny' | 'small' | 'medium' | 'large';
  }
}

declare module 'wix-style-react' {
  export import IconButton = __WSR.IconButton.IconButton;
  export import IconButtonProps = __WSR.IconButton.IconButtonProps;
}

declare module 'wix-style-react/IconButton' {
  export type IconButtonProps = __WSR.IconButton.IconButtonProps;
  export default __WSR.IconButton.IconButton;
}
