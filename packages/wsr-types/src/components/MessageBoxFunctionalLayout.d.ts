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

    export const HeaderLayout: React.SFC<HeaderLayoutProps>;
    export interface HeaderLayoutProps {
      title?: React.ReactNode;
      onCancel?: React.MouseEventHandler<HTMLButtonElement>;
      closeButton?: boolean;
      theme?: HeaderLayoutTheme;
    }
    export type HeaderLayoutTheme =
      | "red"
      | "green"
      | "blue"
      | "lightGreen"
      | "purple";

    export const FooterLayout: React.SFC<FooterLayoutProps>;
    export interface FooterLayoutProps {
      confirmText?: React.ReactNode;
      confirmPrefixIcon?: BaseComponents.IconElement;
      confirmSuffixIcon?: BaseComponents.IconElement;
      cancelText?: React.ReactNode;
      cancelPrefixIcon?: BaseComponents.IconElement;
      cancelSuffixIcon?: BaseComponents.IconElement;
      onCancel?: React.MouseEventHandler<HTMLButtonElement>;
      onOk?: React.MouseEventHandler<HTMLButtonElement>;
      enableOk?: boolean;
      enableCancel?: boolean;
      theme?: string;
      buttonsHeight?: string;
      bottomChildren?: React.ReactNode;
      sideActions?: React.ReactNode;
    }
  }
}

declare module "wix-style-react" {
  export import MessageBoxFunctionalLayout = __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayout;
  export import MessageBoxFunctionalLayoutProps = __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayoutProps;

  export import MessageBoxLayout2 = __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayout;
  export import MessageBoxLayout2Props = __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayoutProps;

  export import HeaderLayout = __WSR.MessageBoxFunctionalLayout.HeaderLayout;
  export import HeaderLayoutProps = __WSR.MessageBoxFunctionalLayout.HeaderLayoutProps;

  export import HeaderLayout1 = __WSR.MessageBoxFunctionalLayout.HeaderLayout;
  export import HeaderLayoutProps1 = __WSR.MessageBoxFunctionalLayout.HeaderLayoutProps;

  export import FooterLayout = __WSR.MessageBoxFunctionalLayout.FooterLayout;
  export import FooterLayoutProps = __WSR.MessageBoxFunctionalLayout.FooterLayoutProps;

  export import FooterLayout1 = __WSR.MessageBoxFunctionalLayout.FooterLayout;
  export import FooterLayoutProps1 = __WSR.MessageBoxFunctionalLayout.FooterLayoutProps;
}

declare module "wix-style-react/MessageBox" {
  export interface MessageBoxFunctionalLayoutProps
    extends __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayoutProps {}
  export import MessageBoxFunctionalLayout = __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayout;

  export interface MessageBoxLayout2Props
    extends __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayoutProps {}
  export import MessageBoxLayout2 = __WSR.MessageBoxFunctionalLayout.MessageBoxFunctionalLayout;

  export interface HeaderLayoutProps
    extends __WSR.MessageBoxFunctionalLayout.HeaderLayoutProps {}
  export import HeaderLayout = __WSR.MessageBoxFunctionalLayout.HeaderLayout;

  export interface HeaderLayout1Props
    extends __WSR.MessageBoxFunctionalLayout.HeaderLayoutProps {}
  export import HeaderLayout1 = __WSR.MessageBoxFunctionalLayout.HeaderLayout;

  export interface FooterLayoutProps
    extends __WSR.MessageBoxFunctionalLayout.FooterLayoutProps {}
  export import FooterLayout = __WSR.MessageBoxFunctionalLayout.FooterLayout;

  export interface FooterLayout1Props
    extends __WSR.MessageBoxFunctionalLayout.FooterLayoutProps {}
  export import FooterLayout1 = __WSR.MessageBoxFunctionalLayout.FooterLayout;
}
