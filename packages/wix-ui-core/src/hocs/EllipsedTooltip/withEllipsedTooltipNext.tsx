import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as shallowequal from 'shallowequal';
import textStyle from './Text.st.css';
import { getDisplayName } from '../utils';
const debounce = require('lodash/debounce');

import { TooltipNext } from '../../components/tooltip-next';
import ellipsisStyle from './EllipsedTooltip.st.css';

interface EllipsedTooltipProps {
  component: React.ReactElement;
  showTooltip?: boolean;
  shouldLoadAsync?: boolean;
  style?: object;
  tooltipProps?: object;
}

interface EllipsedTooltipState {
  isEllipsisActive: boolean;
}

export interface WrapperComponentProps {
  showTooltip?: boolean;
}

interface StateFullComponentWrapProps {
  children?: any;
  [propName: string]: any;
}

class StateFullComponentWrap extends React.Component<
  StateFullComponentWrapProps
> {
  render() {
    const { children, ...props } = this.props;
    return React.cloneElement(children, props);
  }
}

class EllipsedTooltip extends React.Component<
  EllipsedTooltipProps,
  EllipsedTooltipState
> {
  static defaultProps = { showTooltip: true };

  state = { isEllipsisActive: false };

  textNode: HTMLElement;

  componentDidMount() {
    window.addEventListener('resize', this._debouncedUpdate);
    this._updateEllipsisState();
  }

  componentWillUnmount() {
    this._debouncedUpdate.cancel();
    window.removeEventListener('resize', this._debouncedUpdate);
  }

  componentDidUpdate(prevProps) {
    // if props changed, then we want to re-check node for ellipsis state
    // and we can not do such check in render, because we want to check already rendered node
    if (!shallowequal(prevProps, this.props)) {
      this._updateEllipsisState();
    }
  }

  _updateEllipsisState = () => {
    const isEllipsisActive =
      this.props.showTooltip &&
      this.textNode &&
      this.textNode.offsetWidth < this.textNode.scrollWidth;
    this.setState({
      isEllipsisActive,
    });
  };

  _debouncedUpdate = debounce(this._updateEllipsisState, 100);

  _renderText() {
    const { component, style } = this.props;
    return (
      <StateFullComponentWrap
        {...textStyle('root', {}, component.props)}
        style={{
          ...style,
          whiteSpace: 'nowrap',
        }}
        ref={n => (this.textNode = ReactDOM.findDOMNode(n) as HTMLElement)}
      >
        {component}
      </StateFullComponentWrap>
    );
  }

  render() {
    const { showTooltip, tooltipProps } = this.props;
    const { isEllipsisActive } = this.state;
    const shouldLoadTooltip = isEllipsisActive && showTooltip;

    return shouldLoadTooltip ? (
      <TooltipNext
        appendTo="scrollParent"
        {...tooltipProps}
        {...ellipsisStyle('root', {}, tooltipProps || this.props)}
        content={<div>{this.textNode.textContent}</div>}
        showArrow
      >
        {this._renderText()}
      </TooltipNext>
    ) : (
      this._renderText()
    );
  }
}

export const withEllipsedTooltipNext = ({
  showTooltip,
  tooltipProps,
}: {
  showTooltip?: boolean;
  tooltipProps?: object;
} = {}) => Comp => {
  const WrapperComponent: React.FunctionComponent<WrapperComponentProps> = props => (
    <EllipsedTooltip
      {...props}
      component={React.createElement(Comp, props)}
      showTooltip={showTooltip}
      data-hook="ellipsed-tooltip-wrapper"
      tooltipProps={tooltipProps}
    />
  );

  WrapperComponent.displayName = getDisplayName(Comp);

  return WrapperComponent;
};
