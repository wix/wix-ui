declare namespace __WSR {
  namespace MessageBoxFunctionalLayout {
    export interface MessageBoxFunctionalLayoutProps
      extends BaseComponents.WixComponentProps {
      hideFooter?: boolean;
      confirmText?: React.ReactNode;
      confirmPrefixIcon?: BaseComponents.IconElement;
      confirmSuffixIcon?: BaseComponents.IconElement;
      cancelText?: React.ReactNode;
      cancelPrefixIcon?: BaseComponents.IconElement;
      cancelSuffixIcon?: BaseComponents.IconElement;
      theme?: MessageBoxFunctionalLayoutTheme;
      onOk?: React.MouseEventHandler<HTMLButtonElement>;
      onCancel?: React.MouseEventHandler<HTMLButtonElement>;
      onClose?: React.MouseEventHandler<HTMLButtonElement>;
      width?: string;
      margin?: string;
      title?: React.ReactNode;
      maxHeight?: string | number;
      buttonsHeight?: Button.ButtonSize;
      closeButton?: boolean;
      disableCancel?: boolean;
      disableConfirmation?: boolean;
      noBodyPadding?: boolean;
      footerBottomChildren?: React.ReactNode;
      fullscreen?: boolean;
      withEmptyState?: boolean;
      sideActions?: React.ReactNode;
      image?: React.ReactNode;
    }

    export class MessageBoxFunctionalLayout extends BaseComponents.WixComponent<
      MessageBoxFunctionalLayoutProps
    > {}

    export type MessageBoxFunctionalLayoutTheme =
      | "red"
      | "blue"
      | "purple"
      | "green";
  }
}

declare module "wix-style-react" {
  export import MessageBoxFunctionalLayout = __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayout;
  export import MessageBoxFunctionalLayoutProps = __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayoutProps;

  export import MessageBoxLayout2 = __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayout;
  export import MessageBoxLayout2Props = __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayoutProps;
}

declare module "wix-style-react/MessageBox" {
  export interface MessageBoxFunctionalLayoutProps
    extends __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayoutProps {}
  export import MessageBoxFunctionalLayout = __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayout;

  export interface MessageBoxLayout2Props
    extends __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayoutProps {}
  export import MessageBoxLayout2 = __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayout;
}
