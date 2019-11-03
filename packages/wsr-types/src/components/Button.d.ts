declare namespace __WSR {
  namespace Button {
    export interface ButtonProps {
      as?: any;
      className?: string;
      skin?: ButtonSkin;
      priority?: ButtonPriority;
      size?: ButtonSize;
      onClick?: React.MouseEventHandler<HTMLElement>;
      fullWidth?: boolean;
      suffixIcon?: __WSR.BaseComponents.IconElement;
      prefixIcon?: __WSR.BaseComponents.IconElement;
      disabled?: boolean;
      dataHook?: string;
    }

    export class Button extends React.Component<ButtonProps> {}

    export type ButtonSkin =
      | 'standard'
      | 'inverted'
      | 'destructive'
      | 'premium'
      | 'dark'
      | 'light'
      | 'transparent'
      | 'premium-light';

    export type ButtonPriority = 'primary' | 'secondary';

    export type ButtonSize = 'tiny' | 'small' | 'medium' | 'large';
  }
}

declare module 'wix-style-react' {
  export import Button = __WSR.Button.Button;
  export import ButtonProps = __WSR.Button.ButtonProps;
}

declare module 'wix-style-react/Button' {
  export interface ButtonProps extends __WSR.Button.ButtonProps {}
  export default __WSR.Button.Button;
}
