declare namespace __WSR {
  namespace ListItemAction {
    export type ListItemActionProps = Button.ButtonWithAsProp<{
      title: string;
      dataHook?: string;
      skin?: ListItemActionSkin;
      size?: ListItemActionSize;
      prefixIcon?: BaseComponents.IconElement;
      autoFocus?: boolean;
      ellipsis?: boolean;
      disabled?: boolean;
      tooltipModifiers?: BaseComponents.EllipsisHOCProps;
    }>;

    export class ListItemAction extends React.PureComponent<
      ListItemActionProps
    > {}

    export type ListItemActionSkin = 'standard' | 'dark' | 'destructive';
    export type ListItemActionSize = 'small' | 'medium';

    export const listItemActionBuilder: <T extends Partial<ListItemActionProps>>(data: {
      title: string;
      id: string | number;
      prefixIcon?: BaseComponents.IconElement;
      onClick?: React.MouseEventHandler;
      disabled?: boolean;
      skin?: ListItemActionSkin;
      size?: ListItemActionSize;
      dataHook?: string;
      as?: any;
      tabIndex?: number;
      autoFocus?: boolean;
      className?: string;
      ellipsis?: boolean;
    }) => {
      id: string | number;
      disabled: boolean | undefined;
      overrideStyle: true;
      value: (props: T) => React.ReactNode;
    };
  }
}

declare module 'wix-style-react' {
  export import ListItemAction = __WSR.ListItemAction.ListItemAction;
  export import ListItemActionProps = __WSR.ListItemAction.ListItemActionProps;
  export import listItemActionBuilder = __WSR.ListItemAction.listItemActionBuilder;
}

declare module 'wix-style-react/ListItemAction' {
  export import ListItemActionProps = __WSR.ListItemAction.ListItemActionProps;
  export default __WSR.ListItemAction.ListItemAction;

  export import listItemActionBuilder = __WSR.ListItemAction.listItemActionBuilder;
}
