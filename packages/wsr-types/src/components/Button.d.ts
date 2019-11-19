declare namespace __WSR {
  namespace Button {
    /**
     * Construct a type with the properties of T except for those in type K.
     */
    type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

    export type ButtonWithAsProp<T> =
      | ButtonAsButtonProps<T>
      | ButtonAsAnchorProps<T>
      | ButtonGenericProps<T>
      | ButtonAsComponentProps<T>;

    type ButtonAsButtonProps<T> = React.ButtonHTMLAttributes<
      HTMLButtonElement
    > &
      T & {
        as?: 'button';
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
      };

    type ButtonAsAnchorProps<T> = React.AnchorHTMLAttributes<
      HTMLAnchorElement
    > &
      T & {
        as: 'a';
        onClick?: React.MouseEventHandler<HTMLAnchorElement>;
      };

    type ButtonGenericProps<T> = T & {
      as: keyof Omit<HTMLElementTagNameMap, 'a' | 'button'>;
      onClick?: React.MouseEventHandler<HTMLElement>;
      [additionalProps: string]: any;
    };

    type ButtonAsComponentProps<T> = T & {
      as: React.ComponentType<any>;
      onClick?: React.MouseEventHandler<HTMLElement>;
      [additionalProps: string]: any;
    };

    export type ButtonProps = ButtonWithAsProp<{
      className?: string;
      skin?: ButtonSkin;
      priority?: ButtonPriority;
      size?: ButtonSize;
      fullWidth?: boolean;
      suffixIcon?: BaseComponents.IconElement;
      prefixIcon?: BaseComponents.IconElement;
      disabled?: boolean;
      dataHook?: string;
    }>;

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
  export type ButtonProps = __WSR.Button.ButtonProps;
  export default __WSR.Button.Button;
}
