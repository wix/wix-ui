import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as shallowequal from 'shallowequal';
import { st, classes } from './Text.st.css';
import { getDisplayName } from '../utils';
import { Loadable } from '../../components/loadable';
import { TooltipProps } from '../../components/tooltip';
import { RuntimeStylesheet } from '@stylable/runtime';
const debounce = require('lodash/debounce');

class LoadableTooltip extends Loadable<{
  Tooltip: React.ComponentType<TooltipProps>;
  tooltipStyle: RuntimeStylesheet;
}> {}

interface EllipsedTooltipProps {
  /** hook for testing purposes */
  'data-hook'?: string;
  component: React.ReactElement;
  showTooltip?: boolean;
  shouldLoadAsync?: boolean;
  style?: object;
  tooltipProps?: TooltipProps;
}

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

    if (isEllipsisActive !== this.state.isEllipsisActive) {
      this.setState({
        isEllipsisActive,
      });
    }
  };

  _debouncedUpdate = debounce(this._updateEllipsisState, 100);

  _renderText() {
    const { component, style: inlineStyle } = this.props;
    return (
      <StateFullComponentWrap
        className={st(classes.root, component.props.className)}
        style={{
          ...inlineStyle,
          whiteSpace: 'nowrap',
        }}
        data-hook={component.props['data-hook']}
        ref={n => (this.textNode = ReactDOM.findDOMNode(n) as HTMLElement)}
      >
        {component}
      </StateFullComponentWrap>
    );
  }

  render() {
    const { shouldLoadAsync, showTooltip, tooltipProps } = this.props;
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
              appendTo="scrollParent"
              {...tooltipProps}
              className={tooltipStyle.style(
                tooltipStyle.classes.root,
                {},
                tooltipProps.className,
              )}
              data-hook={this.props['data-hook']}
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
  tooltipProps = {},
}: {
  showTooltip?: boolean;
  shouldLoadAsync?: boolean;
  tooltipProps?: object;
} = {}) => Comp => {
  const WrapperComponent: React.FunctionComponent<WrapperComponentProps> = props => (
    <EllipsedTooltip
      {...props}
      component={React.createElement(Comp, props)}
      shouldLoadAsync={shouldLoadAsync}
      showTooltip={showTooltip}
      data-hook="ellipsed-tooltip-wrapper"
      tooltipProps={tooltipProps}
    />
  );

  WrapperComponent.displayName = getDisplayName(Comp);

  return WrapperComponent;
};
