declare namespace __WSR {
  namespace Checkbox {
    export interface CheckboxProps extends BaseComponents.WixComponentProps {
      checked?: boolean;
      disabled?: boolean;
      hasError?: boolean;
      id?: string;
      indeterminate?: boolean;
      errorMessage?: string;
      selectionArea?: CheckboxSelectionArea;
      vAlign?: CheckboxVAlign;
      hover?: boolean;
      size?: CheckboxSize;
      onChange?: React.ChangeEventHandler<HTMLInputElement>;
      className?: string;
    }

    export class Checkbox extends BaseComponents.WixComponent<CheckboxProps> {}

    export type CheckboxSize = 'medium';
    export type CheckboxSelectionArea = 'none' | 'hover' | 'always';
    export type CheckboxVAlign = 'center' | 'top';
  }
}

declare module 'wix-style-react' {
  export import Checkbox = __WSR.Checkbox.Checkbox;
  export import CheckboxProps = __WSR.Checkbox.CheckboxProps;
}

declare module 'wix-style-react/Checkbox' {
  export interface CheckboxProps extends __WSR.Checkbox.CheckboxProps {}
  export default __WSR.Checkbox.Checkbox;
}
