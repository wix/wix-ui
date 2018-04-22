import * as React from 'react';

export interface ControlledClosableProps {
  shown: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

export interface ClosableInjectedProps {
  content: React.ReactNode;
}
export interface ClosableActions {
  close: () => void;
}

export interface ClosableProps {
  shown?: boolean; // Aka - 'open'
  initiallyOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  toggleOnHover?: boolean;
  content: (closable: ClosableActions) => React.ReactNode;
}

export interface ClosableState {
  open?: boolean;
}

/**
 * Add closable state to a ControlledClosable.
 * Will handle: click on CloseButton, click outside, open/close on hover,
 * toggleOnHoverTimeDelay, Esc to close,...
 */
// Inspired by : https://dev.to/danhomola/react-higher-order-components-in-typescript-made-simple
export function withClosable<TOriginalProps extends ControlledClosableProps>(
  Component: React.ComponentClass<TOriginalProps & ClosableInjectedProps> |
             React.StatelessComponent<TOriginalProps & ClosableInjectedProps>) {

  type ResultProps = TOriginalProps & ClosableProps;

  return class ClosableHoc extends React.Component<ResultProps, ClosableState> {
    isControlled = null;
    state: ClosableState = {};

    // TODO: add types
    static defaultProps = {
      toggleOnHover: false
    };

    constructor(props: ResultProps) {
      super(props);
      this.isControlled = props.shown !== null;
      if (!this.isControlled) {
        // not controlled, use internal state
        this.state.open = this.props.initiallyOpen || false;
      }
    }

    // TODO: HOC displayName, propTypes, hoisting

    render() {
      const {shown, content} = this.props;
      const open = this.isControlled ? this.props.shown : this.state.open;

      // TODO: omit open from props
      return (
        <Component
          {...this.props}
          shown={open}
          content={content({close: this.close})}
          onMouseEnter={this.open}
          onMouseLeave={this.close}
          />
      );
    }

    handleMouseEneter() {
      if (this.props.toggleOnHover) {
        this.open();
      }
    }

    handleMouseLeave() {
      if (this.props.toggleOnHover) {
        this.close();
      }
    }

    public open() {
      if (!this.state.open) {
        this.props.onOpen();
        this.setState({open: true});
      }
    }

    public close() {
      if (this.state.open) {
        this.props.onClose();
        this.setState({open: false});
      }
    }
  };
}
