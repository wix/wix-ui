declare namespace __WSR {
  namespace RadioGroup {
    export interface RadioGroupProps extends BaseComponents.WixComponentProps {
      onChange?: RadioButtonProps['onChange'];
      value?: RadioButtonProps['value'];
      disabledRadios?: Array<RadioButtonProps['value']>;
      vAlign?: RadioButtonProps['vAlign'];
      disabled?: RadioButtonProps['disabled'];
      type?: RadioButtonProps['type'];
      display?: RadioGroupDisplay;
      selectionArea?: RadioButtonProps['selectionArea'];
      spacing?: string;
      lineHeight?: string;
    }

    export class RadioGroup extends BaseComponents.WixComponent<
      RadioGroupProps
    > {
      static Radio: typeof RadioButton;
    }

    export type RadioGroupDisplay = 'vertical' | 'horizontal';

    export interface RadioButtonProps extends BaseComponents.WixComponentProps {
      value?: string | number;
      vAlign?: RadioButtonVAlign;
      name?: string;
      onChange?: (value: RadioButtonProps['value']) => void;
      checked?: boolean;
      disabled?: boolean;
      style?: React.CSSProperties;
      type?: RadioButtonType;
      lineHeight?: string;
      tabIndex?: number;
      selectionArea?: RadioButtonSelectionArea;
      content?: React.ReactNode;
    }

    export type RadioButtonVAlign = 'center' | 'top';
    export type RadioButtonType = 'default' | 'button';
    export type RadioButtonSelectionArea = 'none' | 'hover' | 'always';

    export class RadioButton extends BaseComponents.WixComponent<
      RadioButtonProps
    > {}
  }
}

declare module 'wix-style-react' {
  export import RadioGroup = __WSR.RadioGroup.RadioGroup;
  export import RadioGroupProps = __WSR.RadioGroup.RadioGroupProps;
}

declare module 'wix-style-react/RadioGroup' {
  export interface RadioGroupProps extends __WSR.RadioGroup.RadioGroupProps {}
  export default __WSR.RadioGroup.RadioGroup;
}
