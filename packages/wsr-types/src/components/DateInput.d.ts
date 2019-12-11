declare namespace __WSR {
  namespace DateInput {
    export interface DateInputProps extends BaseComponents.OmitPolyfill<Input.InputProps, "value"> {
      dataHook?: string;
      value?: object | string | number;
      locale?: LocalType;
      dateFormat?: string |  ((date: Date) => void);
    }

    export type LocalType = {}; // todo - extract to common from CalendarPanel

    export class DateInput extends React.PureComponent<DateInputProps> {}
  }
}

declare module 'wix-style-react' {
  export import DateInput = __WSR.DateInput.DateInput;
  export import DateInputProps = __WSR.DateInput.DateInputProps;
}

declare module 'wix-style-react/DateInput' {
  export interface DateInputProps extends __WSR.DateInput.DateInputProps {}
  export default __WSR.DateInput.DateInput;
}
