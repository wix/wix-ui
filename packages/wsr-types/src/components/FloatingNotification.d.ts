declare namespace __WSR {
  namespace FloatingNotification {
    export interface FloatingNotificationProps {
      dataHook?: string;
      className?: string;
      type?: FloatingNotificationType;
      showCloseButton?: boolean;
      onClose?: React.MouseEventHandler<HTMLButtonElement>;
      textButtonProps?: FloatingNotificationButtonProps;
      buttonProps?: FloatingNotificationButtonProps;
      prefixIcon?: BaseComponents.IconElement;
      text?: React.ReactNode;
      width?: string;
    }

    export class FloatingNotification extends React.PureComponent<
      FloatingNotificationProps
    > {}

    export type FloatingNotificationType =
      | "standard"
      | "success"
      | "destructive"
      | "warning"
      | "premium"
      | "preview";

    export type FloatingNotificationButtonProps = Button.ButtonWithAsProp<{
      label?: React.ReactNode;
    }>;
  }
}

declare module "wix-style-react" {
  export import FloatingNotification = __WSR.FloatingNotification.FloatingNotification;
  export import FloatingNotificationProps = __WSR.FloatingNotification.FloatingNotificationProps;
}

declare module "wix-style-react/FloatingNotification" {
  export interface FloatingNotificationProps
    extends __WSR.FloatingNotification.FloatingNotificationProps {}
  export default __WSR.FloatingNotification.FloatingNotification;
}
