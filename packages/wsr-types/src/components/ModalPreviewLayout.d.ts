declare namespace __WSR {
  namespace ModalPreviewLayout {
    export interface ModalPreviewLayoutProps {
      dataHook?: string;
      actions?: React.ReactNode;
      title?: string;
      children: React.ReactNode;
      onClose: () => void;
      shouldCloseOnOverlayClick?: boolean;
    }

    export class ModalPreviewLayout extends React.PureComponent<
      ModalPreviewLayoutProps
    > {}
  }
}

declare module 'wix-style-react' {
  export import ModalPreviewLayout = __WSR.ModalPreviewLayout.ModalPreviewLayout;
  export import ModalPreviewLayoutProps = __WSR.ModalPreviewLayout.ModalPreviewLayoutProps;
}

declare module 'wix-style-react/ModalPreviewLayout' {
  export interface ModalPreviewLayoutProps
    extends __WSR.ModalPreviewLayout.ModalPreviewLayoutProps {}
  export default __WSR.ModalPreviewLayout.ModalPreviewLayout;
}
