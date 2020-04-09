import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as shallowequal from 'shallowequal';
import * as classNames from 'classnames';
import { style, classes } from './Ellipsis.st.css';
import { StateFullComponentWrap } from './StateFullComponentWrap';
const debounce = require('lodash/debounce');

interface EllipsisTooltipProps {
  /** a children render prop - usually a text component */
  children(
    childrenProps: any,
  ): {
    className?: string;
    style?: object;
    [otherPropName: string]: any;
  };
  /** truncate the text but don't display a tooltip */
  showTooltip?: boolean;
}

interface EllipsisTooltipState {
  isTooltipActivated: boolean;
  Tooltip: React.ComponentClass;
  tooltipStyle: RuntimeStylesheet;
}
/** Apply ellipsis and a custom tooltip to your text nodes */
export class EllipsisTooltip extends React.Component<
  EllipsisTooltipProps,
  EllipsisTooltipState
> {
  static defaultProps = { showTooltip: true };

  state = { isTooltipActivated: false, Tooltip: null, tooltipStyle: null };

  dynamicAssetsLoadingTriggered: boolean = false;
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
    if (!shallowequal(prevProps, this.props)) {
      this._updateEllipsisState();
    }
  }

  _loadTooltip = async () => {
    const { Tooltip } = await import('../../components/tooltip');
    this.setState({ Tooltip }, () => this._updateEllipsisState());
  };

  _loadTooltipStyle = async () => {
    const tooltipStyle = await import('./EllipsisTooltip.st.css');
    this.setState({ tooltipStyle }, () => this._updateEllipsisState());
  };

  _isOverflowing() {
    return (
      this.textNode && this.textNode.offsetWidth < this.textNode.scrollWidth
    );
  }

  _updateEllipsisState = () => {
    const { Tooltip, tooltipStyle } = this.state;
    const { showTooltip } = this.props;

    const shouldShowTooltip = showTooltip && this._isOverflowing();

    if (shouldShowTooltip && !this.dynamicAssetsLoadingTriggered) {
      this.dynamicAssetsLoadingTriggered = true;
      if (!Tooltip) {
        this._loadTooltip();
      }
      if (!tooltipStyle) {
        this._loadTooltipStyle();
      }
    }

    this.setState({
      isTooltipActivated: shouldShowTooltip && Tooltip && tooltipStyle,
    });
  };

  _debouncedUpdate = debounce(this._updateEllipsisState, 100);

  _renderChildren() {
    const { children } = this.props;

    const enhancedChildrenProps = (
      childrenProps = { className: null, style: {} },
    ) => ({
      className: classNames(childrenProps.className, classes.root),
      style: {
        ...childrenProps.style,
        'white-space': 'nowrap', //required to make sure it will not break line
      },
    });

    return (
      <StateFullComponentWrap
        ref={n => (this.textNode = ReactDOM.findDOMNode(n) as HTMLElement)}
      >
        {children(enhancedChildrenProps)}
      </StateFullComponentWrap>
    );
  }

  render() {
    const { Tooltip, tooltipStyle, isTooltipActivated } = this.state;

    return isTooltipActivated ? (
      <Tooltip
        className={
          tooltipStyle ? tooltipStyle.style(tooltipStyle.classes.root) : {}
        }
        appendTo="window"
        content={<div>{this.textNode.textContent}</div>}
        showArrow
      >
        {this._renderChildren()}
      </Tooltip>
    ) : (
      this._renderChildren()
    );
  }
}
