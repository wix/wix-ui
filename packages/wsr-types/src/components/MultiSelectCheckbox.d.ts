declare namespace __WSR {
  namespace MultiSelectCheckbox {
    export interface MultiSelectCheckboxProps
      extends InputWithOptions.InputWithOptionsProps<
        InputWithOptions.ManualInputFnSignature,
        OnSelectFnSignature
      > {
      selectedOptions?: DropdownLayout.DropdownLayoutValueOption[];
      onDeselect?: (
        id: DropdownLayout.DropdownLayoutValueOption["id"],
        option: DropdownLayout.DropdownLayoutValueOption
      ) => void;
      delimiter?: string;
    }

    export class MultiSelectCheckbox extends InputWithOptions.InputWithOptions<
      InputWithOptions.ManualInputFnSignature,
      OnSelectFnSignature,
      MultiSelectCheckboxProps
    > {}

    export type OnSelectFnSignature = (
      id: DropdownLayout.DropdownLayoutValueOption["id"],
      option: DropdownLayout.DropdownLayoutValueOption
    ) => void;
  }
}

declare module "wix-style-react" {
  export import MultiSelectCheckbox = __WSR.MultiSelectCheckbox.MultiSelectCheckbox;
  export import MultiSelectCheckboxProps = __WSR.MultiSelectCheckbox.MultiSelectCheckboxProps;
}

declare module "wix-style-react/MultiSelectCheckbox" {
  export interface MultiSelectCheckboxProps
    extends __WSR.MultiSelectCheckbox.MultiSelectCheckboxProps {}
  export default __WSR.MultiSelectCheckbox.MultiSelectCheckbox;
}
