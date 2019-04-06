import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as shallowequal from 'shallowequal';
import * as classNames from 'classnames';
import ellipsisStyles from './Ellipsis.st.css';
import { StateFullComponentWrap } from './StateFullComponentWrap';
const debounce = require('lodash/debounce');

interface EllipsisTooltipProps {
  /** decide wether to apply ellipsis measurements or not (for dynamic imports) */
  showTooltip?: boolean;
  /** the tooltip content to display when text is truncated */
  tooltipContent: React.ReactNode;
  /** a render prop children, usually a text component */
  children(
    childrenProps: any,
  ): {
    className?: string;
    [otherPropName: string]: any;
  };
}

interface EllipsisTooltipState {
  isEllipsisActive: boolean;
  Tooltip: React.ComponentClass;
  tooltipStyle: RuntimeStylesheet;
}
export class EllipsisTooltip extends React.Component<
  EllipsisTooltipProps,
  EllipsisTooltipState
> {
  static defaultProps = { showTooltip: true };

  state = { isEllipsisActive: false, Tooltip: null, tooltipStyle: null };

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

  _loadTooltip = async () => {
    const { Tooltip } = await import('../../components/tooltip');
    this.setState({ Tooltip });
  };

  _loadTooltipStyle = async () => {
    const { default: tooltipStyle } = await import('./EllipsisTooltip.st.css');
    this.setState({ tooltipStyle });
  };

  _updateEllipsisState = () => {
    const { Tooltip, isEllipsisActive } = this.state;
    const { showTooltip } = this.props;

    const isEllipsisActiveNewState =
      showTooltip &&
      this.textNode &&
      this.textNode.offsetWidth < this.textNode.scrollWidth;
    if (isEllipsisActiveNewState && !isEllipsisActive && !Tooltip) {
      this._loadTooltip();
      this._loadTooltipStyle();
    }
    this.setState({
      isEllipsisActive: isEllipsisActiveNewState,
    });
  };

  _debouncedUpdate = debounce(this._updateEllipsisState, 100);

  _renderChildren() {
    const { children } = this.props;

    const enhancedChildrenProps = (childrenProps = { className: null }) => ({
      className: classNames(childrenProps.className, ellipsisStyles.root),
    });

    return (
      <StateFullComponentWrap
        ref={n => (this.textNode = ReactDOM.findDOMNode(n) as HTMLElement)}
      >
        {children(enhancedChildrenProps)}
      </StateFullComponentWrap>
    );
  }

  _isTooltipActive() {
    const { isEllipsisActive, Tooltip } = this.state;
    const { showTooltip } = this.props;
    return !!(showTooltip && isEllipsisActive && Tooltip);
  }

  render() {
    const { Tooltip, tooltipStyle } = this.state;
    const { tooltipContent } = this.props;

    return this._isTooltipActive() ? (
      <Tooltip
        {...(tooltipStyle ? tooltipStyle('root', {}, this.props) : {})}
        appendTo="scrollParent"
        content={tooltipContent}
        showArrow
      >
        {this._renderChildren()}
      </Tooltip>
    ) : (
      this._renderChildren()
    );
  }
}
