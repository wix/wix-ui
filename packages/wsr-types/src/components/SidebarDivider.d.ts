declare namespace __WSR {
  namespace SidebarDivider {
    export interface SidebarDividerProps {
      dataHook?: string;
      fullWidth?: boolean;
    }

    export class SidebarDivider extends React.PureComponent<
      SidebarDividerProps
    > {}
  }
}

declare module "wix-style-react" {
  export import SidebarDivider = __WSR.SidebarDivider.SidebarDivider;
  export import SidebarDividerProps = __WSR.SidebarDivider.SidebarDividerProps;
}

declare module "wix-style-react/SidebarDivider" {
  export interface SidebarDividerProps
    extends __WSR.SidebarDivider.SidebarDividerProps {}
  export default __WSR.SidebarDivider.SidebarDivider;
}
