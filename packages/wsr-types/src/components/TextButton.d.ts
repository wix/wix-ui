declare namespace __WSR {
  namespace TextButton {
    export interface TextButtonProps {
      as?: any;
      className?: string;
      skin?: TextButtonSkin;
      underline?: TextButtonUnderline;
      weight?: TextButtonWeight;
      size?: TextButtonSize;
      onClick?: React.MouseEventHandler<HTMLElement>;
      suffixIcon?: BaseComponents.IconElement;
      prefixIcon?: BaseComponents.IconElement;
      disabled?: boolean;
      dataHook?: string;
      target?: string;
    }

    export class TextButton extends React.Component<TextButtonProps> {}

    export type TextButtonSkin = 'standard' | 'light' | 'premium' | 'dark';
    export type TextButtonUnderline = 'none' | 'onHover' | 'always';
    export type TextButtonWeight = 'thin' | 'normal';
    export type TextButtonSize = 'tiny' | 'small' | 'medium';
  }
}

declare module 'wix-style-react' {
  export import TextButton = __WSR.TextButton.TextButton;
  export import TextButtonProps = __WSR.TextButton.TextButtonProps;
}

declare module 'wix-style-react/TextButton' {
  export interface TextButtonProps extends __WSR.TextButton.TextButtonProps {}
  export default __WSR.TextButton.TextButton;
}
