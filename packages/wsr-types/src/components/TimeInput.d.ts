declare namespace __WSR {
  namespace TimeInput {
    export interface TimeInputProps {
      dashesWhenDisabled?: boolean;
      dataHook?: string;
      defaultValue?: import('moment').Moment;
      disableAmPm?: boolean;
      disabled?: boolean;
      onChange?: (time: import('moment').Moment) => void;
      rtl?: boolean;
      style?: object;
    }

    export class TimeInput extends React.PureComponent<TimeInputProps> {}
  }
}

declare module 'wix-style-react' {
  export import TimeInput = __WSR.TimeInput.TimeInput;
  export import TimeInputProps = __WSR.TimeInput.TimeInputProps;
}

declare module 'wix-style-react/TimeInput' {
  export interface TimeInputProps extends __WSR.TimeInput.TimeInputProps {}
  export default __WSR.TimeInput.TimeInput;
}
