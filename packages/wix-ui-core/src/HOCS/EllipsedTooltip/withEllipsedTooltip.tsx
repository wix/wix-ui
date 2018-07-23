import * as React from 'react';
import {node, bool} from 'prop-types';
import * as shallowequal from 'shallowequal';
import {Tooltip} from 'wix-ui-core/Tooltip';
import style from './EllipsedTooltip.st.css';
import {getDisplayName} from '../../HOCS/utils';

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

class EllipsedTooltip extends React.Component<EllipsedTooltipProps, EllipsedTooltipState> {
  static propTypes = {
    component: node.isRequired,
    showTooltip: bool
  };

  static defaultProps = {showTooltip: true};

  state = {isEllipsisActive: false};

  textNode: HTMLElement;

  componentDidMount() {
    window.addEventListener('resize', this._updateEllipsisState);
    this._updateEllipsisState();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._updateEllipsisState);
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

  _renderText() {
    const {component} = this.props;

    return React.cloneElement(
      component,
      {
        ...style('root text', {}, this.props.component.props),
        style: {whiteSpace: 'nowrap'},
        forwardedRef: n => this.textNode = n
      }
    );
  }

  render() {
    if (!this.state.isEllipsisActive || !this.props.showTooltip) {
      return this._renderText();
    }

    return (
      <Tooltip
        {...style('root tooltip')}
        appendTo="scrollParent"
        content={<div className={style.tooltipContent}>{this.props.component.props.children}</div>}
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
      component={React.createElement(Comp, props)}
      showTooltip={showTooltip}
    />
  );

  WrapperComponent.displayName = getDisplayName(Comp);

  return WrapperComponent;
};
