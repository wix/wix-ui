declare namespace __WSR {
  namespace CloseButton {
    export type CloseButtonProps = Button.ButtonWithAsProp<{
      className?: string;
      skin?: CloseButtonSkin;
      size?: CloseButtonSize;
      disabled?: boolean;
      dataHook?: string;
    }>;

    export class CloseButton extends React.Component<CloseButtonProps> {}

    export type CloseButtonSkin =
      | 'standard'
      | 'standardFilled'
      | 'light'
      | 'lightFilled'
      | 'dark'
      | 'transparent';

    export type CloseButtonSelectionArea = 'none' | 'hover' | 'always';
    export type CloseButtonSize = 'small' | 'medium';
  }
}

declare module 'wix-style-react' {
  export import CloseButton = __WSR.CloseButton.CloseButton;
  export import CloseButtonProps = __WSR.CloseButton.CloseButtonProps;
}

declare module 'wix-style-react/CloseButton' {
  export type CloseButtonProps = __WSR.CloseButton.CloseButtonProps;
  export default __WSR.CloseButton.CloseButton;
}
