declare namespace __WSR {
  namespace InputWithOptions {
    export interface InputWithOptionsProps<
      ManualInputFn = ManualInputFnSignature,
      OnSelectFn = OnSelectFnSignature
    >
      extends BaseComponents.OmitPolyfill<Input.InputProps, "theme">,
        BaseComponents.OmitPolyfill<
          DropdownLayout.DropdownLayoutProps,
          "theme" | "onSelect"
        > {
      // TODO: there is a bug in WSR - theme exists in InputProps and DropdownLayoutProps
      // and it has different set of values
      theme?: string;

      autocomplete?: string;
      inputElement?: React.ReactElement;
      closeOnSelect?: boolean;
      onManuallyInput?: ManualInputFn;
      valueParser?: (
        option: DropdownLayout.DropdownLayoutValueOption
      ) => DropdownLayout.DropdownLayoutValueOption["value"];
      dropdownWidth?: string;
      dropdownOffsetLeft?: string;
      showOptionsIfEmptyInput?: boolean;
      highlight?: boolean;
      native?: boolean;
      popoverProps?: object; // TODO update when PopoverProps are implemented
      onSelect?: OnSelectFn;
    }

    export class InputWithOptions<
      ManualInputFn = ManualInputFnSignature,
      OnSelectFn = OnSelectFnSignature,
      T extends InputWithOptionsProps<
        ManualInputFn,
        OnSelectFn
      > = InputWithOptionsProps<ManualInputFn, OnSelectFn>
    > extends React.Component<T> {
      focus: (options?: FocusOptions) => void;
      blur: () => void;
      select: () => void;
    }

    export type ManualInputFnSignature = (
      inputValue: string,
      suggestedOption: DropdownLayout.DropdownLayoutValueOption
    ) => void;

    export type OnSelectFnSignature = DropdownLayout.DropdownLayoutProps["onSelect"];
  }
}

declare module "wix-style-react" {
  export import InputWithOptions = __WSR.InputWithOptions.InputWithOptions;
  export import InputWithOptionsProps = __WSR.InputWithOptions.InputWithOptionsProps;
}

declare module "wix-style-react/InputWithOptions" {
  export interface InputWithOptionsProps
    extends __WSR.InputWithOptions.InputWithOptionsProps {}
  export default __WSR.InputWithOptions.InputWithOptions;
}
