declare namespace __WSR {
  namespace SidebarSectionItem {
    export interface SidebarSectionItemProps {
      dataHook?: string;
      children: React.ReactNode;
      prefix?: React.ReactNode;
      suffix?: React.ReactNode;
      selected?: boolean;
      disabled?: boolean;
      drillable?: boolean;
      alwaysDisplayChevron?: boolean;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
    }

    export class SidebarSectionItem extends React.PureComponent<
      SidebarSectionItemProps
    > {}
  }
}

declare module "wix-style-react" {
  export import SidebarSectionItem = __WSR.SidebarSectionItem.SidebarSectionItem;
  export import SidebarSectionItemProps = __WSR.SidebarSectionItem.SidebarSectionItemProps;
}

declare module "wix-style-react/SidebarSectionItem" {
  export interface SidebarSectionItemProps
    extends __WSR.SidebarSectionItem.SidebarSectionItemProps {}
  export default __WSR.SidebarSectionItem.SidebarSectionItem;
}
