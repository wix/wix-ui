import * as React from 'react';

export interface ControlledClosableProps {
  open: boolean;
}

export interface InjectedProps {
  onClose: () => void;
}

export interface ExternalProps {
  open?: boolean;
  initiallyOpen?: boolean;
}

export interface ClosableState {
  open?: boolean;
}

/**
 * Add closable state to a ControlledClosable.
 * Will handle: click on CloseButton, click outside, open/close on hover,
 * open/close timeDelay, Esc to close,...
 */
// Inspired by : https://dev.to/danhomola/react-higher-order-components-in-typescript-made-simple
function withClosable<TOriginalProps extends ControlledClosableProps>(
  Component: React.ComponentClass<TOriginalProps & InjectedProps> |
             React.StatelessComponent<TOriginalProps & InjectedProps>) {

  type ResultProps = TOriginalProps & ExternalProps;

  return class ClosableHoc extends React.Component<ResultProps, ClosableState> {
      private isControlled = null;
      state: ClosableState = {};

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
            onClose={this.handleClose}
            />

        );
      }

      handleClose = () => {
        this.setState({open: false});
      }
  };

}
