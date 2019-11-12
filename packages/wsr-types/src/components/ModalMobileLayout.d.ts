declare namespace __WSR {
  namespace ModalMobileLayout {
    export interface ModalMobileLayoutProps {
      dataHook?: string;
      title?: React.ReactNode;
      stickyTitle?: boolean;
      content?: React.ReactNode;
      footer?: React.ReactNode;
      stickyFooter?: boolean;
      onOverlayClick?: () => void;
      onCloseButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
      fullscreen?: boolean;
    }

    export class ModalMobileLayout extends React.PureComponent<
      ModalMobileLayoutProps
    > {}
  }
}

declare module 'wix-style-react' {
  export import ModalMobileLayout = __WSR.ModalMobileLayout.ModalMobileLayout;
  export import ModalMobileLayoutProps = __WSR.ModalMobileLayout.ModalMobileLayoutProps;
}

declare module 'wix-style-react/ModalMobileLayout' {
  export interface ModalMobileLayoutProps
    extends __WSR.ModalMobileLayout.ModalMobileLayoutProps {}
  export default __WSR.ModalMobileLayout.ModalMobileLayout;
}
