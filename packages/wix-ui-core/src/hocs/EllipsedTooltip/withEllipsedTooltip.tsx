import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as shallowequal from 'shallowequal';
import textStyle from './Text.st.css';
import { getDisplayName } from '../utils';
import { Loadable } from '../../components/loadable';
import { TooltipProps } from '../../components/tooltip';
const debounce = require('lodash/debounce');

class LoadableTooltip extends Loadable<
  TooltipProps,
  { Tooltip: React.ComponentType<TooltipProps> }
> {}

type EllipsedTooltipProps = {
  component: React.ReactElement<any>;
  showTooltip?: boolean;
  shouldLoadAsync?: boolean;
  style?: object;
};

type EllipsedTooltipState = {
  isEllipsisActive: boolean;
  tooltipStyle: RuntimeStylesheet;
};

export type WrapperComponentProps = {
  showTooltip?: boolean;
};

/*
  React 15 can have refs just on StateFull components,
  and as we need a ref of unknown children it required to proxy it with StateFullComponent
*/
type StateFullComponentWrapProps = { children?: any; [propName: string]: any };

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

  state = { isEllipsisActive: false, tooltipStyle: null };

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

  loadTooltipStyle = async () => {
    const { default: tooltipStyle } = await import('./EllipsedTooltip.st.css');
    this.setState({ tooltipStyle });
  };

  _updateEllipsisState = () => {
    const isEllipsisActive =
      this.props.showTooltip &&
      this.textNode &&
      this.textNode.offsetWidth < this.textNode.scrollWidth;
    if (
      isEllipsisActive &&
      !this.state.isEllipsisActive &&
      !this.state.tooltipStyle
    ) {
      this.loadTooltipStyle();
    }
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
    const { shouldLoadAsync, showTooltip } = this.props;
    const { isEllipsisActive, tooltipStyle } = this.state;
    const shouldLoadTooltip = isEllipsisActive && showTooltip;

    return (
      <LoadableTooltip
        loader={() =>
          shouldLoadAsync
            ? import('../../components/Tooltip')
            : require('../../components/Tooltip')
        }
        defaultComponent={this._renderText()}
        componentKey="Tooltip"
        shouldLoadComponent={shouldLoadTooltip}
      >
        {Tooltip => {
          return (
            <Tooltip
              {...(tooltipStyle ? tooltipStyle('root', {}, this.props) : {})}
              appendTo="scrollParent"
              content={<div>{this.textNode.textContent}</div>}
              showArrow
            >
              {this._renderText()}
            </Tooltip>
          );
        }}
      </LoadableTooltip>
    );
  }
}

export const withEllipsedTooltip = ({
  showTooltip,
  shouldLoadAsync,
}: { showTooltip?: boolean; shouldLoadAsync?: boolean } = {}) => Comp => {
  const WrapperComponent: React.SFC<WrapperComponentProps> = props => (
    <EllipsedTooltip
      {...props}
      component={React.createElement(Comp, props)}
      shouldLoadAsync={shouldLoadAsync}
      showTooltip={showTooltip}
      data-hook="ellipsed-tooltip-wrapper"
    />
  );

  WrapperComponent.displayName = getDisplayName(Comp);

  return WrapperComponent;
};
