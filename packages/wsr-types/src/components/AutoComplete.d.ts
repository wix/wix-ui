declare namespace __WSR {
  namespace AutoComplete {
    export interface AutoCompleteProps
      extends InputWithOptions.InputWithOptionsProps {
      predicate?: (option: DropdownLayout.DropdownLayoutValueOption) => boolean;
    }

    export class AutoComplete extends InputWithOptions.InputWithOptions<
      AutoCompleteProps
    > {}
  }
}

declare module "wix-style-react" {
  export import AutoComplete = __WSR.AutoComplete.AutoComplete;
  export import AutoCompleteProps = __WSR.AutoComplete.AutoCompleteProps;
}

declare module "wix-style-react/AutoComplete" {
  export interface AutoCompleteProps
    extends __WSR.AutoComplete.AutoCompleteProps {}
  export default __WSR.AutoComplete.AutoComplete;
}
