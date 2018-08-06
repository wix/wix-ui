import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {node, bool} from 'prop-types';
import * as shallowequal from 'shallowequal';
import {Tooltip} from '../../components/Tooltip';
import textStyle from './Text.st.css';
import tooltipStyle from './EllipsedTooltip.st.css';
import {getDisplayName} from '../utils';
import debounce = require('lodash/debounce');

type EllipsedTooltipProps = {
  component: React.ReactElement<any>,
  showTooltip?: boolean
}

type EllipsedTooltipState = {
  isEllipsisActive: boolean
}

export type WrapperComponentProps = {
  showTooltip?: boolean;
}

/*
  React 15 can have refs just on StateFull components,
  and as we need a ref of unknown children it required to proxy it with StateFullComponent
*/
type StateFullComponentWrapProps = {children?: any, [propName: string]: any}

class StateFullComponentWrap extends React.Component<StateFullComponentWrapProps> {
  render() {
    const { children, ...props } = this.props;
    return React.cloneElement(
      children,
      props
    );
  }
}

class EllipsedTooltip extends React.Component<EllipsedTooltipProps, EllipsedTooltipState> {
  static propTypes = {
    component: node.isRequired,
    showTooltip: bool
  };

  static defaultProps = {showTooltip: true};

  state = {isEllipsisActive: false};

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
    this.setState({
      isEllipsisActive: this.textNode && this.textNode.offsetWidth < this.textNode.scrollWidth
    });
  };

  _debouncedUpdate = debounce(this._updateEllipsisState, 100);

  _renderText() {
    const {component} = this.props;
    return (
      <StateFullComponentWrap
        {...textStyle('root', {}, component.props)}
        style={{ whiteSpace: 'nowrap' }}
        ref={n => this.textNode = ReactDOM.findDOMNode(n) as HTMLElement}
      >
        {component}
      </StateFullComponentWrap>
    );
  }

  render() {
    if (!this.state.isEllipsisActive || !this.props.showTooltip) {
      return this._renderText();
    }

    return (
      <Tooltip
        {...tooltipStyle('root', {}, this.props)}
        appendTo="scrollParent"
        content={<div>{this.props.component.props.children}</div>}
        showArrow
      >
        {this._renderText()}
      </Tooltip>
    );
  }
}

export const withEllipsedTooltip = ({showTooltip}: {showTooltip?: boolean} = {}) => Comp => {
  const WrapperComponent: React.SFC<WrapperComponentProps> = props => (
    <EllipsedTooltip
      {...props}
      component={React.createElement(Comp, props)}
      showTooltip={showTooltip}
      data-hook="ellipsed-tooltip-wrapper"
    />
  );

  WrapperComponent.displayName = getDisplayName(Comp);

  return WrapperComponent;
};
