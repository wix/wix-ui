declare namespace __WSR {
  namespace Modal {
    export interface ModalProps extends BaseComponents.WixComponentProps {
      isOpen: boolean;
      borderRadius?: number;
      contentLabel?: string;
      theme?: ModalTheme;
      zIndex?: number;
      shouldCloseOnOverlayClick?: boolean;
      shouldDisplayCloseButton?: boolean;
      onRequestClose?: (event?: React.MouseEvent | React.KeyboardEvent) => void;
      onAfterOpen?: () => void;
      horizontalPosition?: ModalHorizontalPostion;
      verticalPosition?: ModalVerticalPosition;
      closeTimeoutMS?: number;
      scrollable?: boolean;
      scrollableContent?: boolean;
      maxHeight?: string;
      height?: string;
      overlayPosition?: ModalOverlayPosition;
      parentSelector?: () => HTMLElement;
      appElement?: string;
    }

    export class Modal extends BaseComponents.WixComponent<ModalProps> {}

    export type ModalTheme = 'blue' | 'red' | 'green' | 'white';
    export type ModalHorizontalPostion = 'start' | 'center' | 'end';
    export type ModalVerticalPosition = 'start' | 'center' | 'end';
    export type ModalOverlayPosition =
      | 'static'
      | 'relative'
      | 'absolute'
      | 'fixed'
      | 'sticky';
  }
}

declare module 'wix-style-react' {
  export import Modal = __WSR.Modal.Modal;
  export import ModalProps = __WSR.Modal.ModalProps;
}

declare module 'wix-style-react/Modal' {
  export interface ModalProps extends __WSR.Modal.ModalProps {}
  export default __WSR.Modal.Modal;
}
