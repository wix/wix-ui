declare namespace __WSR {
  namespace InputWithOptions {
    export interface InputWithOptionsProps
      extends Omit<Input.InputProps, "theme">,
        Omit<DropdownLayout.DropdownLayoutProps, "theme"> {
      // TODO: there is a bug in WSR - theme exists in InputProps and DropdownLayoutProps
      // and it has different set of values
      theme?: string;

      autocomplete?: string;
      inputElement?: React.ReactElement;
      closeOnSelect?: boolean;
      onManuallyInput?: (
        inputValue: string,
        suggestedOption: DropdownLayout.DropdownLayoutValueOption
      ) => void;
      valueParser?: (
        option: DropdownLayout.DropdownLayoutValueOption
      ) => DropdownLayout.DropdownLayoutValueOption["value"];
      dropdownWidth?: string;
      dropdownOffsetLeft?: string;
      showOptionsIfEmptyInput?: boolean;
      highlight?: boolean;
      native?: boolean;
      popoverProps?: object; // TODO update when PopoverProps are implemented
    }

    export class InputWithOptions<
      T extends InputWithOptionsProps = InputWithOptionsProps
    > extends React.Component<T> {
      focus: (options?: FocusOptions) => void;
      blur: () => void;
      select: () => void;
    }
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
