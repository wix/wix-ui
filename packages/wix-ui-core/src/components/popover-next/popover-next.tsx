import * as React from 'react';
import PopperJS from 'popper.js';

interface PopperProps {
  modifiers: any;
  placement: any;
}

interface PopperState {
  data: any;
  placement: any;
}

const initialStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0,
  pointerEvents: 'none',
};

const initialArrowStyle = {};

export class PopoverNext extends React.Component<PopperProps, PopperState> {
  referenceElement = undefined;
  popperInstance = undefined;

  popperNode = undefined;
  arrowNode = undefined;

  state = {
    data: undefined,
    placement: undefined,
  };

  updateStateModifier = {
    enabled: true,
    order: 900,
    fn: data => {
      const { placement } = data;
      this.setState({ data, placement });
      return data;
    },
  };

  getPopperStyle = () =>
    !this.popperNode || !this.state.data
      ? initialStyle
      : {
          position: this.state.data.offsets.popper.position,
          ...this.state.data.styles,
        };

  getPopperPlacement = () =>
    !this.state.data ? undefined : this.state.placement;

  getArrowStyle = () =>
    !this.arrowNode || !this.state.data
      ? initialArrowStyle
      : this.state.data.arrowStyles;

  destroyPopperInstance = () => {
    if (!this.popperInstance) {
      return;
    }
    this.popperInstance.destroy();
    this.popperInstance = null;
  };

  updatePopperInstance = () => {
    this.destroyPopperInstance();

    if (!this.referenceElement || !this.popperNode) {
      return;
    }

    this.popperInstance = new PopperJS(this.referenceElement, this.popperNode, {
      placement: this.props.placement,
      modifiers: {
        applyStyle: { enabled: false },
        updateStateModifier: this.updateStateModifier,
      },
    });
  };

  scheduleUpdate = () => {
    if (this.popperInstance) {
      this.popperInstance.scheduleUpdate();
    }
  };

  componentDidUpdate(prevProps: PopperProps, prevState: PopperState) {
    // If the Popper.js options have changed, update the instance (destroy + create)
    if (this.props.placement !== prevProps.placement) {
      this.updatePopperInstance();
    }

    // A placement difference in state means popper determined a new placement
    // apart from the props value. By the time the popper element is rendered with
    // the new position Popper has already measured it, if the place change triggers
    // a size change it will result in a misaligned popper. So we schedule an update to be sure.
    if (prevState.placement !== this.state.placement) {
      this.scheduleUpdate();
    }
  }

  componentWillUnmount() {
    this.destroyPopperInstance();
  }

  render() {
    return this.props.children[0]({
      ref: this.setPopperNode,
      style: this.getPopperStyle(),
      placement: this.getPopperPlacement(),
      scheduleUpdate: this.scheduleUpdate,
      arrowProps: {
        ref: this.setArrowNode,
        style: this.getArrowStyle(),
      },
    });
  }
}
