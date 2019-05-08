import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as shallowequal from 'shallowequal';
import textStyle from './Text.st.css';
import { getDisplayName } from '../utils';
import { Loadable } from '../../components/loadable';
import { TooltipProps } from '../../components/tooltip';
const debounce = require('lodash/debounce');

class LoadableTooltip extends Loadable<{
  Tooltip: React.ComponentType<TooltipProps>;
  tooltipStyle: RuntimeStylesheet;
}> {}

interface EllipsedTooltipProps {
  component: React.ReactElement<any>;
  showTooltip?: boolean;
  shouldLoadAsync?: boolean;
  style?: object;
};

interface EllipsedTooltipState {
  isEllipsisActive: boolean;
}

export interface WrapperComponentProps {
  showTooltip?: boolean;
}

/*
  React 15 can have refs just on StateFull components,
  and as we need a ref of unknown children it required to proxy it with StateFullComponent
*/
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
    const { shouldLoadAsync, showTooltip } = this.props;
    const { isEllipsisActive } = this.state;
    const shouldLoadTooltip = isEllipsisActive && showTooltip;

    return (
      <LoadableTooltip
        loader={{
          Tooltip: () =>
            shouldLoadAsync
              ? import('../../components/tooltip')
              : require('../../components/tooltip'),
          tooltipStyle: () =>
            shouldLoadAsync
              ? import('./EllipsedTooltip.st.css')
              : require('./EllipsedTooltip.st.css'),
        }}
        defaultComponent={this._renderText()}
        namedExports={{
          Tooltip: 'Tooltip',
        }}
        shouldLoadComponent={shouldLoadTooltip}
      >
        {({ Tooltip, tooltipStyle }) => {
          return (
            <Tooltip
              {...tooltipStyle('root', {}, this.props)}
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
