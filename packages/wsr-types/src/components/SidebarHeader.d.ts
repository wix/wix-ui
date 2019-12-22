declare namespace __WSR {
  namespace SidebarHeader {
    export interface SidebarHeaderProps {
      dataHook?: string;
      title?: string;
      subtitle?: string;
    }

    export class SidebarHeader extends React.PureComponent<
      SidebarHeaderProps
    > {}
  }
}

declare module "wix-style-react" {
  export import SidebarHeader = __WSR.SidebarHeader.SidebarHeader;
  export import SidebarHeaderProps = __WSR.SidebarHeader.SidebarHeaderProps;
}

declare module "wix-style-react/SidebarHeader" {
  export interface SidebarHeaderProps
    extends __WSR.SidebarHeader.SidebarHeaderProps {}
  export default __WSR.SidebarHeader.SidebarHeader;
}
