import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as shallowequal from 'shallowequal';
import * as classNames from 'classnames';
import { classes as ellipsisClasses } from './Ellipsis.st.css';
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
  tooltipClasses: Record<string, string>;
}
/** Apply ellipsis and a custom tooltip to your text nodes */
export class EllipsisTooltip extends React.Component<
  EllipsisTooltipProps,
  EllipsisTooltipState
> {
  static defaultProps = { showTooltip: true };

  state = { isTooltipActivated: false, Tooltip: null, tooltipClasses: null };

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
    const { classes } = await import('./EllipsisTooltip.st.css');
    this.setState({ tooltipClasses: classes }, () =>
      this._updateEllipsisState(),
    );
  };

  _isOverflowing() {
    return (
      this.textNode && this.textNode.offsetWidth < this.textNode.scrollWidth
    );
  }

  _updateEllipsisState = () => {
    const { Tooltip, tooltipClasses } = this.state;
    const { showTooltip } = this.props;

    const shouldShowTooltip = showTooltip && this._isOverflowing();

    if (shouldShowTooltip && !this.dynamicAssetsLoadingTriggered) {
      this.dynamicAssetsLoadingTriggered = true;
      if (!Tooltip) {
        this._loadTooltip();
      }
      if (!tooltipClasses) {
        this._loadTooltipStyle();
      }
    }

    this.setState({
      isTooltipActivated:
        shouldShowTooltip && Tooltip && Boolean(tooltipClasses),
    });
  };

  _debouncedUpdate = debounce(this._updateEllipsisState, 100);

  _renderChildren() {
    const { children } = this.props;

    const enhancedChildrenProps = (
      childrenProps = { className: null, style: {} },
    ) => ({
      className: classNames(childrenProps.className, ellipsisClasses.root),
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
    const { Tooltip, tooltipClasses, isTooltipActivated } = this.state;

    return isTooltipActivated ? (
      <Tooltip
        className={tooltipClasses ? tooltipClasses.root : {}}
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
