declare namespace __WSR {
  namespace InputArea {
    export interface InputAreaProps extends BaseComponents.WixComponentProps {
      ariaControls?: string;
      ariaDescribedby?: string;
      ariaLabel?: string;
      autoFocus?: boolean;
      autoSelect?: boolean;
      dataHook?: string;
      size?: InputAreaSize;
      defaultValue?: string;
      disabled?: boolean;
      error?: boolean;
      errorMessage?: string;
      forceFocus?: boolean;
      forceHover?: boolean;
      hasCounter?: boolean;
      id?: string;
      name?: string;
      maxHeight?: string;
      maxLength?: number;
      menuArrow?: boolean;
      minHeight?: string;
      onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
      onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
      // TODO: is this needed? - I think it is deprecated
      onClear?: Function;
      onEnterPressed?: () => void;
      onEscapePressed?: () => void;
      onFocus?: (e?: React.FocusEvent<HTMLTextAreaElement>) => void;
      onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
      onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement>;
      // TODO: is this needed? - I think it is deprecated
      onTooltipShow?: Function;
      placeholder?: string;
      readOnly?: boolean;
      resizable?: boolean;
      rows?: number;
      autoGrow?: boolean;
      minRowsAutoGrow?: number;
      style?: InputAreaTheme;
      tabIndex?: number;
      theme?: InputAreaTheme;
      tooltipPlacement?: string; // TODO: replace with TooltipProps['placement']
      value?: string;
      status?: Input.InputStatusError | Input.InputStatusWarning;
      statusMessage?: string;
    }

    export class InputArea extends BaseComponents.WixComponent<InputAreaProps> {
      static MIN_ROWS: 2;
    }

    export type InputAreaSize = "small" | "normal";
    export type InputAreaTheme =
      | "normal"
      | "paneltitle"
      | "material"
      | "amaterial";
  }
}

declare module "wix-style-react" {
  export import InputArea = __WSR.InputArea.InputArea;
  export import InputAreaProps = __WSR.InputArea.InputAreaProps;
}

declare module "wix-style-react/InputArea" {
  export type InputAreaProps = __WSR.InputArea.InputAreaProps;
  export default __WSR.InputArea.InputArea;
}
