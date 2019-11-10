declare namespace __WSR {
  namespace FormField {
    export interface FormFieldProps {
      children?:
        | React.ReactNode
        | ((data: { setCharactersLeft: CharactersLeftFn }) => React.ReactNode);
      charCount?: number;
      stretchContent?: boolean;
      label?: React.ReactNode;
      labelSize?: LabelPlacement;
      labelPlacement?: FormFieldLabelPlacement;
      required?: boolean;
      infoContent?: React.ReactNode;
      infoTooltipProps?: any; // TODO: replace with TooltipProps onces in WSR
      id?: string;
      dataHook?: string;
    }

    export class FormField extends React.Component<FormFieldProps> {}

    export type FormFieldLabelPlacement = 'top' | 'right' | 'left';
    export type LabelPlacement = 'small' | 'medium';
    type CharactersLeftFn = (lengthLeft: number) => void;
  }
}

declare module 'wix-style-react' {
  export import FormField = __WSR.FormField.FormField;
  export import FormFieldProps = __WSR.FormField.FormFieldProps;
}

declare module 'wix-style-react/FormField' {
  export interface FormFieldProps extends __WSR.FormField.FormFieldProps {}
  export default __WSR.FormField.FormField;
}
