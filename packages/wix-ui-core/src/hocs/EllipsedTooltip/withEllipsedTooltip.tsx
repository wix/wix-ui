import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {node, bool} from 'prop-types';
import * as shallowequal from 'shallowequal';
import {Tooltip} from 'wix-ui-core/Tooltip';
import style from './EllipsedTooltip.st.css';
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

class EllipsedTooltip extends React.Component<EllipsedTooltipProps, EllipsedTooltipState> {
  static propTypes = {
    component: node.isRequired,
    showTooltip: bool
  };

  static defaultProps = {showTooltip: true};

  state = {isEllipsisActive: false};

  textNode: HTMLElement;

  debounceTimerId: any;

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
    this.setTextNodeRef();
    this.setState({
      isEllipsisActive: this.textNode && this.textNode.offsetWidth < this.textNode.scrollWidth
    });
  };

  _debouncedUpdate = debounce(this._updateEllipsisState, 100);

  setTextNodeRef = (linkToDom?: any) => {
    if (this.state.isEllipsisActive && linkToDom) {
      this.textNode = linkToDom;
    } else {
      this.textNode = ReactDOM.findDOMNode(this) as HTMLElement;
    }
  };

  _renderText() {
    const {component} = this.props;

    return React.cloneElement(
      component,
      {
        ...style('root text', {}, this.props.component.props),
        style: {whiteSpace: 'nowrap'},
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
        content={<div className={style.tooltipContent} ref={this.setTextNodeRef}>{this.props.component.props.children}</div>}
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
