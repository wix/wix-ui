declare namespace __WSR {
  namespace MessageBoxMarketerialLayout {
    export interface MessageBoxMarketerialLayoutProps
      extends BaseComponents.WixComponentProps {
      title: React.ReactNode;
      content: React.ReactNode;
      primaryButtonLabel?: string;
      primaryButtonDisabled?: boolean;
      secondaryButtonLabel?: string;
      onPrimaryButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
      onSecondaryButtonClick?: React.MouseEventHandler<HTMLElement>;
      imageUrl?: string;
      onClose: React.MouseEventHandler<HTMLButtonElement>;
      imageComponent?: React.ReactNode;
      footerBottomChildren?: React.ReactNode;
      theme?: MessageBoxMarketerialLayoutTheme;
      primaryButtonTheme?: MessageBoxMarketerialLayoutThemePrimaryButtonTheme;
      removeButtonsPadding?: boolean;
    }

    export class MessageBoxMarketerialLayout extends BaseComponents.WixComponent<
      MessageBoxMarketerialLayoutProps
    > {}

    export type MessageBoxMarketerialLayoutTheme = "blue" | "purple" | "white";
    export type MessageBoxMarketerialLayoutThemePrimaryButtonTheme =
      | "blue"
      | "purple";
  }
}

declare module "wix-style-react" {
  export import MessageBoxMarketerialLayout = __WSR.MessageBoxMarketerialLayout.MessageBoxMarketerialLayout;
  export import MessageBoxMarketerialLayoutProps = __WSR.MessageBoxMarketerialLayout.MessageBoxMarketerialLayoutProps;

  export import MessageBoxLayout1 = __WSR.MessageBoxMarketerialLayout.MessageBoxMarketerialLayout;
  export import MessageBoxLayout1Props = __WSR.MessageBoxMarketerialLayout.MessageBoxMarketerialLayoutProps;
}

declare module "wix-style-react/MessageBox" {
  export interface MessageBoxMarketerialLayoutProps
    extends __WSR.MessageBoxMarketerialLayout
      .MessageBoxMarketerialLayoutProps {}
  export import MessageBoxMarketerialLayout = __WSR.MessageBoxMarketerialLayout.MessageBoxMarketerialLayout;

  export interface MessageBoxLayout1Props
    extends __WSR.MessageBoxMarketerialLayout
      .MessageBoxMarketerialLayoutProps {}
  export import MessageBoxLayout1 = __WSR.MessageBoxMarketerialLayout.MessageBoxMarketerialLayout;
}
