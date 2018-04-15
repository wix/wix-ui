import * as React from 'react';

export interface ControlledClosableProps {
  open: boolean;
  onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
}

export interface InjectedProps {
  onClose: () => void;
}

export interface ExternalProps {
  open?: boolean;
  initiallyOpen?: boolean;
  onOpen?: () => void;
  onClose: () => void;
  toggleOnHover?: boolean;
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
function withClosable<TOriginalProps extends ControlledClosableProps>(
  Component: React.ComponentClass<TOriginalProps & InjectedProps> |
             React.StatelessComponent<TOriginalProps & InjectedProps>) {

  type ResultProps = TOriginalProps & ExternalProps;

  return class ClosableHoc extends React.Component<ResultProps, ClosableState> {
    private isControlled = null;
    state: ClosableState = {};

    // TODO: add types
    static defaultProps = {
      toggleOnHover: false
    };

    constructor(props: ResultProps ) {
      super(props);
      this.isControlled = props.open !== null;
      if (!this.isControlled) {
        // not controlled, use internal state
        this.state.open = this.props.initiallyOpen || false;
      }
    }

    // TODO: HOC displayName, propTypes, hoisting

    render() {
      const open = this.isControlled ? this.props.open : this.state.open;

      // TODO: omit open from props
      return (
        <Component
          {...this.props}
          open={open}
          onClose={this.close}
          onMouseEnter={this.open}
          onMouseLeave={this.close}
          />

      );
    }

    private handleMouseEneter() {
      if (this.props.toggleOnHover) {
        this.open();
      }
    }

    private handleMouseLeave() {
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
