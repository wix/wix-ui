declare namespace __WSR {
  namespace SidebarSectionTitle {
    export interface SidebarSectionTitleProps {
      dataHook?: string;
      children: React.ReactNode;
    }

    export class SidebarSectionTitle extends React.PureComponent<
      SidebarSectionTitleProps
    > {}
  }
}

declare module "wix-style-react" {
  export import SidebarSectionTitle = __WSR.SidebarSectionTitle.SidebarSectionTitle;
  export import SidebarSectionTitleProps = __WSR.SidebarSectionTitle.SidebarSectionTitleProps;
}

declare module "wix-style-react/SidebarSectionTitle" {
  export interface SidebarSectionTitleProps
    extends __WSR.SidebarSectionTitle.SidebarSectionTitleProps {}
  export default __WSR.SidebarSectionTitle.SidebarSectionTitle;
}
