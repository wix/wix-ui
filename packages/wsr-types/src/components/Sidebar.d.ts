declare namespace __WSR {
  namespace Sidebar {
    export interface SidebarProps {
      classNames?: SidebarClassNames;
      dataHook?: string;
      isHidden?: boolean;
      skin?: SidebarSkin;
      selectedKey?: string;
    }

    export class Sidebar extends React.Component<SidebarProps> {
      static Item: typeof SidebarItem;
      static PersistentHeader: typeof SidebarPersistentHeader;
      static PersistentFooter: typeof SidebarPersistentFooter;
      static BackButton: typeof SidebarBackButton;

      setSelectedKey: (setSelectedKey: string) => void;
    }

    export type SidebarSkin = "dark" | "light";
    export type SidebarClassNames = {
      sideBar?: string;
      content?: string;
      slider?: string;
      sliderOutToLeft?: string;
      sliderOutToRight?: string;
      sliderInFromLeft?: string;
      sliderInFromRight?: string;
    };

    class SidebarItem extends React.PureComponent<SidebarItemProps> {}
    interface SidebarItemProps {
      itemKey?: string;
      innerMenu?: React.ReactNode[];
      disable?: boolean;
      onClick?: (itemKey: string, e: React.MouseEvent<HTMLElement>) => void;
    }

    class SidebarPersistentHeader extends React.Component<
      SidebarPersistentHeaderProps
    > {}
    interface SidebarPersistentHeaderProps {}

    class SidebarPersistentFooter extends React.Component<
      SidebarPersistentFooterProps
    > {}
    interface SidebarPersistentFooterProps {}

    class SidebarBackButton extends React.Component<SidebarBackButtonProps> {}
    interface SidebarBackButtonProps {
      disable?: boolean;
      onClick?: React.MouseEventHandler<HTMLElement>;
    }

    export class SidebarContextConsumer extends React.Component<
      SideBarContextConsumerProps
    > {}
    interface SideBarContextConsumerProps {
      children(renderProps: {
        itemClicked: (itemKey: string) => void;
        backClicked: () => void;
        getSelectedKey: () => string;
        getSkin: () => SidebarSkin;
      }): React.ReactNode;
    }

    export class SidebarItemContextConsumer extends React.Component<
      SidebarItemContextConsumerProps
    > {}
    interface SidebarItemContextConsumerProps {
      chidlren(renderProps: { selected: () => boolean }): React.ReactNode;
    }
  }
}

declare module "wix-style-react" {
  export import Sidebar = __WSR.Sidebar.Sidebar;
  export import SidebarProps = __WSR.Sidebar.SidebarProps;
  export import SidebarContextConsumer = __WSR.Sidebar.SidebarContextConsumer;
  export import SidebarItemContextConsumer = __WSR.Sidebar.SidebarItemContextConsumer;
}

declare module "wix-style-react/Sidebar" {
  export interface SidebarProps extends __WSR.Sidebar.SidebarProps {}
  export default __WSR.Sidebar.Sidebar;
  export import SidebarContextConsumer = __WSR.Sidebar.SidebarContextConsumer;
  export import SidebarItemContextConsumer = __WSR.Sidebar.SidebarItemContextConsumer;
}
