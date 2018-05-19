import * as React from 'react';
import Popper from 'popper.js';

export interface Controls {
  toggle(): void;
  show(): void;
  hide(): void;
}

export type Placement = Popper.Placement;

export interface Props {
  trigger(Controls): React.ReactNode;
  menu(Controls): React.ReactNode;
  placement?: Placement;
}

export interface State {
  open: Boolean;
}

export class Pop extends React.PureComponent<Props, State> {
  toggleRef: Element;
  menuRef: Element;
  popper: any;

  state = {
    open: false
  };

  defaultProps = {
    placement: 'bottom'
  };

  componentDidMount() {
    this.popper = new Popper(
      this.toggleRef,
      this.menuRef,
      {
        placement: this.props.placement || 'bottom'
      }
    );
  }

  _update(state) {
    this.setState(state, this.popper.scheduleUpdate);
  }

  _componentInterface = {
    toggle: () => this._update({open: !this.state.open}),
    show: () => this._update({open: true}),
    hide: () => this._update({open: false})
  };

  render() {
    return (
      <div style={{display: 'inline-block'}}>
        <div ref={ref => this.toggleRef = ref}>
          {this.props.trigger(this._componentInterface)}
        </div>

        <div ref={ref => this.menuRef = ref}>
          {this.state.open && this.props.menu(this._componentInterface) }
        </div>
      </div>
    );
  }
}
