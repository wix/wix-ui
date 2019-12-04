declare namespace __WSR {
  namespace FloatingHelper {
    export type FloatingHelperProps = import('wix-ui-core/dist/src/createHOC').WixComponentProps &
      FloatingHelperPropsInner;

    export class FloatingHelper extends React.PureComponent<FloatingHelperProps> {}

    export enum Appearance {
      dark = 'dark',
      light = 'light'
    }

    export interface FloatingHelperOwnProps {
      width?: string | number;
      target: React.ReactNode
      content: React.ReactNode
      onClose?: Function;
      appearance?: Appearance;
    }

    export interface PickedClosablePopoverPropsHack {
      /** Controls wether the popover's content is initially opened (In Uncontrolled mode only) */
      initiallyOpened?: boolean;
      /** Controls wether the popover's content is shown or not (aka Controlled mode).
       * When undefined, then the component is Uncontrolled. See open/close behaviour section in docs. */
      opened?: boolean;
      /** The location to display the content. possible values: 'auto-start',
       'auto',
       'auto-end',
       'top-start',
       'top',
       'top-end',
       'right-start',
       'right',
       'right-end',
       'bottom-end',
       'bottom',
       'bottom-start',
       'left-end',
       'left',
       'left-start' */
      placement: Placement;
      /** Enables calculations in relation to a dom element. possible values: 'scrollParent', 'viewport', 'window' or an Element. See PopperJs docs: https://popper.js.org/popper-documentation.html#modifiers..preventOverflow.boundariesElement */
      appendTo?: AppendTo;
      /** Callback to call when the popover content is requested to be opened (Uncontrolled mode only)*/
      onOpen?: Function;
    }

    export type PickedClosablePopoverProps = Pick<ClosablePopoverProps,
      'initiallyOpened'| 'opened' | 'target'| 'onClose'| 'onOpen'| 'placement'| 'appendTo'>;

    export type FloatingHelperPropsInner = PickedClosablePopoverProps & FloatingHelperOwnProps & PickedClosablePopoverPropsHack;

    /* Closable Popover */
    export type Popover = import('wix-ui-core/dist/src/components/popover').Popover;
    export type PopoverProps = import('wix-ui-core/dist/src/components/popover').PopoverProps;
    export type Placement = import('wix-ui-core/dist/src/components/popover').Placement;
    export type AppendTo = import('wix-ui-core/dist/src/components/popover').AppendTo;

    export interface ClosablePopoverState {
      open?: boolean;
      mode?: Mode;
    }

    export enum Mode {
      Hover = 'hover',
      ClickToClose = 'click-to-close'
    }

    export interface ClosablePopoverState {
      open?: boolean;
      mode?: Mode;
    }

    export type PickedPopoverProps = Pick<
      PopoverProps,
      | 'className'
      | 'placement'
      | 'showArrow'
      | 'moveBy'
      | 'hideDelay'
      | 'showDelay'
      | 'moveArrowTo'
      | 'appendTo'
      | 'timeout'
      >;

    export interface ClosablePopoverActions {
      /** Closes the popover content*/
      close: () => void;
    }

    export interface ClosablePopoverOwnProps {
      /** Controls wether the popover's content is shown or not.
       * When undefined, then the component is Uncontrolled,
       * It is initially open, and it can be closed by close-action */
      opened?: boolean;
      /** Controls wether the popover's content is initially opened (in Uncontrolled mode only) */
      initiallyOpened?: boolean;
      /** The popover's content, given as a function that receives control-actions and renders the contet.
       * In Uncontrolled mode, this function is still called only once.
       */
      content: (closable: ClosablePopoverActions) => React.ReactNode;
      /** The popover's target element*/
      target: React.ReactNode;
      /** Callback to call when the popover content is requested to be opened (Uncontrolled mode only) */
      onOpen?: Function;
      /** callback to call when the popover content is requested to be closed (Uncontrolled mode only). NOTE: this callback is called when the close timeout (if exists) starts */
      onClose?: Function;
      /** Disable close on mouseLeave */
      closeOnMouseLeave?: boolean;
    }

    export type ClosablePopoverProps = PickedPopoverProps & ClosablePopoverOwnProps;
  }
}

declare module 'wix-style-react' {
  export import FloatingHelper = __WSR.FloatingHelper.FloatingHelper;
  export import FloatingHelperProps = __WSR.FloatingHelper.FloatingHelperProps;
  export import FloatingHelperAppearance = __WSR.FloatingHelper.Appearance;
}

declare module 'wix-style-react/FloatingHelper' {
  export interface FloatingHelperProps extends __WSR.FloatingHelper.FloatingHelperProps {}
  export import Appearance = __WSR.FloatingHelper.Appearance;
  export default __WSR.FloatingHelper.FloatingHelper;
}
