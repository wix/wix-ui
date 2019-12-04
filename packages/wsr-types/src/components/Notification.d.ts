declare namespace __WSR {
  namespace Notification {
    export interface NotificationProps {
      dataHook?: string;
      show?: boolean;
      theme?: 'standard'
      | 'error'
      | 'success'
      | 'warning'
      | 'premium';
      type?: 'local' | 'global' | 'sticky';
      autoHideTimeout?: number;
      zIndex?: number;
      onClose?: (source: string) => void;
    }

    export class Notification extends React.Component<NotificationProps> {
      static ActionButton: typeof ActionButton;
      static TextLabel: typeof TextLabel;
      static CloseButton: typeof CloseButton.CloseButton;
    }

    const TextLabel: React.SFC;
    const ActionButton: React.SFC<ActionButtonProps>;
    type ActionButtonProps = Button.ButtonWithAsProp<{
      link?: boolean;
      type?: string;
      target?: string;
    }>;
  }
}

declare module "wix-style-react" {
  export import Notification = __WSR.Notification.Notification;
  export import NotificationProps = __WSR.Notification.NotificationProps;
}

declare module "wix-style-react/Notification" {
  export interface NotificationProps extends __WSR.Notification.NotificationProps {}
  export default __WSR.Notification.Notification;
}
