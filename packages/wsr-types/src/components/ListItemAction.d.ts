declare namespace __WSR {
  namespace ListItemAction {
    export type ListItemActionProps = Button.ButtonWithAsProp<{
      dataHook?: string;
      skin?: ListItemActionSkin;
      size?: ListItemActionSize;
      prefixIcon?: BaseComponents.IconElement;
      autoFocus?: boolean;
      ellipsis?: boolean;
      title: string;
      disabled?: boolean;
      tooltipModifiers?: { [key: string]: any }; // TODO: what is the type of this prop?
    }>;

    export class ListItemAction extends React.PureComponent<
      ListItemActionProps
    > {}

    export type ListItemActionSkin = "standard" | "dark" | "destructive";
    export type ListItemActionSize = "small" | "medium";

    export const listItemActionBuilder: (
      data: any
    ) => {
      id: string;
      disabled: boolean;
      overrideStyle: boolean;
      value: (props: any) => ListItemAction;
    };
  }
}

declare module "wix-style-react" {
  export import ListItemAction = __WSR.ListItemAction.ListItemAction;
  export import ListItemActionProps = __WSR.ListItemAction.ListItemActionProps;
  export import listItemActionBuilder = __WSR.ListItemAction.listItemActionBuilder;
}

declare module "wix-style-react/ListItemAction" {
  export import ListItemActionProps = __WSR.ListItemAction.ListItemActionProps;
  export default __WSR.ListItemAction.ListItemAction;
  export import listItemActionBuilder = __WSR.ListItemAction.listItemActionBuilder;
}
