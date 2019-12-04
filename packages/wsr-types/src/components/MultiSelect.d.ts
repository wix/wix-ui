declare namespace __WSR {
  namespace MultiSelect {
    export interface MultiSelectProps
      extends InputWithOptions.InputWithOptionsProps<
        (values: string[]) => void
      > {
      selectedId?: DropdownLayout.DropdownLayoutProps["selectedId"];
      closeOnSelect?: DropdownLayout.DropdownLayoutProps["closeOnSelect"];
      selectedHighlight?: DropdownLayout.DropdownLayoutProps["selectedHighlight"];
      predicate?: (option: DropdownLayout.DropdownLayoutValueOption) => boolean;
      tags?: MultiSelectTag[];
      maxNumRows?: number;
      delimiters?: string[];
      mode?: MultiSelectMode;
      error?: boolean;
      errorMessage?: string;
      onReorder?: OnReorderFn;
      onSelect?: (option: DropdownLayout.DropdownLayoutValueOption) => void;
      customInput?: React.ReactNode | Function;
      customSuffix?: React.ReactNode;
      disabled?: boolean;
      onRemoveTag?: (tagId: Tag.TagProps["id"]) => void;
      clearOnBlur?: boolean;
    }

    export class MultiSelect extends InputWithOptions.InputWithOptions<
      (values: string[]) => void,
      InputWithOptions.OnSelectFnSignature,
      MultiSelectProps
    > {}

    export type MultiSelectMode = "select";
    export type OnReorderFn = (data: {
      addedIndex: number;
      removedIndex: number;
    }) => void;

    export type MultiSelectTag = BaseComponents.OmitPolyfill<
      Tag.TagProps,
      "children"
    > & {
      label: string;
    };
  }
}

declare module "wix-style-react" {
  export import MultiSelect = __WSR.MultiSelect.MultiSelect;
  export import MultiSelectProps = __WSR.MultiSelect.MultiSelectProps;
}

declare module "wix-style-react/MultiSelect" {
  export interface MultiSelectProps
    extends __WSR.MultiSelect.MultiSelectProps {}
  export default __WSR.MultiSelect.MultiSelect;
}
