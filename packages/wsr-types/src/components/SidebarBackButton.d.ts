declare namespace __WSR {
  namespace SidebarBackButton {
    export interface SidebarBackButtonProps {
      dataHook?: string;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
      children?: string;
      animateArrow?: boolean;
    }

    export class SidebarBackButton extends React.PureComponent<
      SidebarBackButtonProps
    > {}
  }
}

declare module "wix-style-react" {
  export import SidebarBackButton = __WSR.SidebarBackButton.SidebarBackButton;
  export import SidebarBackButtonProps = __WSR.SidebarBackButton.SidebarBackButtonProps;
}

declare module "wix-style-react/SidebarBackButton" {
  export interface SidebarBackButtonProps
    extends __WSR.SidebarBackButton.SidebarBackButtonProps {}
  export default __WSR.SidebarBackButton.SidebarBackButton;
}
