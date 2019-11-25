declare namespace __WSR {
  namespace Dropdown {
    export interface DropdownPropsControlled
      extends InputWithOptions.InputWithOptionsProps {
      selectedId?: DropdownLayout.DropdownLayoutProps["selectedId"];
      initialSelectedId?: never;
    }

    export interface DropdownPropsUncontrolled
      extends InputWithOptions.InputWithOptionsProps {
      selectedId?: never;
      initialSelectedId?: DropdownLayout.DropdownLayoutProps["selectedId"];
    }

    export type DropdownProps =
      | DropdownPropsControlled
      | DropdownPropsUncontrolled;

    export class Dropdown extends InputWithOptions.InputWithOptions<
      DropdownProps
    > {}
  }
}

declare module "wix-style-react" {
  export import Dropdown = __WSR.Dropdown.Dropdown;
  export import DropdownProps = __WSR.Dropdown.DropdownProps;
}

declare module "wix-style-react/Dropdown" {
  export type DropdownProps = __WSR.Dropdown.DropdownProps;
  export default __WSR.Dropdown.Dropdown;
}
