import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as shallowequal from 'shallowequal';

import { style as textStyle, classes } from './Text.st.css';
import { getDisplayName } from '../utils';
import { Loadable } from '../../components/loadable';
import { TooltipProps } from '../../components/tooltip-next/tooltip-next';
const debounce = require('lodash/debounce');

class LoadableTooltip extends Loadable<{
  TooltipNext: React.ComponentType<TooltipProps>;
  style: RuntimeStylesheet;
}> {}

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
    const { component, style } = this.props;
    return (
      <StateFullComponentWrap
        className={textStyle(classes.root, {}, component.props)}
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

    return (
      <LoadableTooltip
        loader={{
          TooltipNext: () =>
            // because variables are not parsed by webpack transpiler
            process.env.NODE_ENV === 'test' ||
            process.env.NODE_ENV === 'development'
              ? require('../../components/tooltip-next')
              : import('../../components/tooltip-next'),
          style: () =>
            // because variables are not parsed by webpack transpiler
            process.env.NODE_ENV === 'test' ||
            process.env.NODE_ENV === 'development'
              ? require('./EllipsedTooltip.st.css')
              : import('./EllipsedTooltip.st.css'),
        }}
        defaultComponent={this._renderText()}
        namedExports={{
          TooltipNext: 'TooltipNext',
        }}
        shouldLoadComponent={shouldLoadTooltip}
      >
        {({ TooltipNext, style }) => {
          return (
            <TooltipNext
              appendTo="scrollParent"
              {...tooltipProps}
              className={classes.root}
              content={<div>{this.textNode.textContent}</div>}
              showArrow
            >
              {this._renderText()}
            </TooltipNext>
          );
        }}
      </LoadableTooltip>
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
