declare namespace __WSR {
  namespace Input {
    export interface InputProps {
      ariaControls?: string;
      ariaDescribedby?: string;
      ariaLabel?: string;
      autoFocus?: boolean;
      autoSelect?: boolean;
      autocomplete?: string;
      dataHook?: string;
      defaultValue?: string;
      disabled?: boolean;
      status?: InputStatus;
      statusMessage?: React.ReactNode;
      hideStatusSuffix?: boolean;
      /**
       * @deprecated
       * @see status
       */
      error?: boolean;
      /**
       * @deprecated
       * @see statusMessage
       */
      errorMessage?: React.ReactNode;
      forceFocus?: boolean;
      forceHover?: boolean;
      help?: boolean;
      helpMessage?: React.ReactNode;
      id?: string;
      maxLength?: number;
      menuArrow?: boolean;
      clearButton?: boolean;
      className?: string;
      name?: string;
      noLeftBorderRadius?: boolean;
      noRightBorderRadius?: boolean;
      onBlur?: React.FocusEventHandler<HTMLInputElement>;
      onChange?: React.ChangeEventHandler<HTMLInputElement>;
      onClear?: React.MouseEventHandler<HTMLInputElement>;
      onCompositionChange?: (isComposing: boolean) => void;
      onEnterPressed?: React.KeyboardEventHandler<HTMLInputElement>;
      onEscapePressed?: React.KeyboardEventHandler<HTMLInputElement>;
      onFocus?: (e?: FocusEvent) => void;
      onInputClicked?: React.MouseEventHandler<HTMLInputElement>;
      onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
      onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
      onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
      onTooltipShow?: () => void;
      placeholder?: string;
      prefix?: React.ReactNode;
      readOnly?: boolean;
      disableEditing?: boolean;
      roundInput?: boolean;
      rtl?: boolean;
      size?: InputSize;
      suffix?: React.ReactNode;
      tabIndex?: number;
      textOverflow?: string;
      theme?: InputTheme;
      title?: string;
      // TODO: replace with TooltipProps['placement'] once merged into WSR
      tooltipPlacement?: import('wix-ui-core/popover').Placement;
      type?: string;
      value?: string | number;
      withSelection?: boolean;
      required?: boolean;
      min?: number;
      max?: number;
      step?: number;
      customInput?: React.ReactNode | Function;
      updateControlledOnClear?: boolean;
    }

    export class Input extends React.Component<InputProps> {
      static Ticker: typeof Ticker;
      static Unit: typeof Unit;
      static IconAffix: typeof IconAffix;
      static Affix: typeof Affix;
      static Group: typeof Group;
      static StatusError: InputStatusError;
      static StatusLoading: InputStatusLoading;
      static StatusWarning: InputStatusWarning;
    }

    export type InputStatus =
      | InputStatusError
      | InputStatusWarning
      | InputStatusLoading;
    export type InputStatusError = 'error';
    export type InputStatusLoading = 'loading';
    export type InputStatusWarning = 'warning';

    export type InputSize = 'small' | 'normal' | 'medium' | 'large';

    export type InputTheme =
      | 'normal'
      | 'tags'
      | 'paneltitle'
      | 'material'
      | 'amaterial'
      | 'flat'
      | 'flatdark';
  }

  const Ticker: React.SFC<TickerProps>;
  interface TickerProps {
    onUp?: React.MouseEventHandler<HTMLElement>;
    onDown?: React.MouseEventHandler<HTMLElement>;
    upDisabled?: boolean;
    downDisabled?: boolean;
    dataHook?: string;
  }

  class Unit extends React.Component<UnitProps> {}
  interface UnitProps {
    value?: string;
  }

  const IconAffix: React.SFC<IconAffixProps>;
  interface IconAffixProps {
    dataHook?: string;
  }

  const Affix: React.SFC<AffixProps>;
  interface AffixProps {
    value?: string;
  }

  const Group: React.SFC;
}

declare module 'wix-style-react' {
  export import Input = __WSR.Input.Input;
  export import InputProps = __WSR.Input.InputProps;
}

declare module 'wix-style-react/Input' {
  export interface InputProps extends __WSR.Input.InputProps {}
  export default __WSR.Input.Input;
}
