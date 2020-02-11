declare namespace __WSR {
  namespace InputWithLabel {
    export interface InputWithLabelProps {
      dataHook?: string;
      suffix?: React.ReactNode[];
      label?: string;
      value?: string | number;
      status?: Input.InputStatus;
      statusMessage?: React.ReactNode;
      onFocus?: React.FocusEventHandler<HTMLInputElement>;
      onBlur?: React.FocusEventHandler<HTMLInputElement>;
      onChange?: React.ChangeEventHandler<HTMLInputElement>;
      name?: string;
      type?: string;
      ariaLabel?: string;
      autoFocus?: boolean;
      autocomplete?: string;
      disabled?: boolean;
      className?: string;
      maxLength?: number;
      placeholder?: string;
      customInput?: React.ReactNode | Function;
    }

    export class InputWithLabel extends React.Component<InputWithLabelProps> {
    }
  }
}

declare module 'wix-style-react' {
  export import InputWithLabel = __WSR.InputWithLabel.InputWithLabel;
  export import InputWithLabelProps = __WSR.InputWithLabel.InputWithLabelProps;
}

declare module 'wix-style-react/InputWithLabel' {
  export interface InputWithLabelProps extends __WSR.InputWithLabel.InputWithLabelProps {}
  export default __WSR.InputWithLabel.InputWithLabel;
}
