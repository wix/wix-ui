import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {any, oneOfType, number, string} from 'prop-types';
/*
  To resolve issue, we need to import Requireable
  error TS4026: Public static property 'propTypes' of exported class has or is using name 'Requireable'
  from external module
  "/Users/andriit/Documents/Projects/wix-ui/packages/wix-ui-core/node_modules/@types/prop-types/index"
  but cannot be named.
*/
import { Requireable } from 'prop-types';
import {Label} from './../Label';
import {Tooltip} from './../Tooltip';
import {isShallowEqual} from './../../utils/isShallowEqual.tsx';
import {isEllipsisActive} from './../../utils/isEllipsisActive.tsx';
import style from './Badge.st.css';

export interface BadgeProps {
  children?: React.ReactNode;
  className?: string;
  maxWidth?: number | string;
}

export interface BadgeState {
  isEllipsisActive: boolean;
}

/**
 * Badge
 */
export class Badge extends React.Component<BadgeProps, BadgeState> {
  static displayName = 'Badge';
  static propTypes = {
    /** Any node to be rendered (usually text node) */
    children: any,

    /** className to place on the root of the rendered element */
    className: string,

    /** When a maximum width is set and the badge content did not fit, a tooltip will become visible */
    maxWidth: oneOfType([number, string]),
  }

  state = {
    isEllipsisActive: false
  }

  componentDidMount() {
    this.updateEllipsesState();
  }

  componentDidUpdate(prevProps) {
    // if props changed, then we want to re-check node for ellipsis state
    // and we can not do such check in render, because we want to check already rendered node
    if (!isShallowEqual(prevProps, this.props)) {
      this.updateEllipsesState();
    }
  }

  updateEllipsesState = () => this.setState({isEllipsisActive: isEllipsisActive(ReactDOM.findDOMNode(this) as HTMLElement)});

  render() {
    if (!this.state.isEllipsisActive) {
      return (
        <span
          {...style('root', {}, this.props)}
          style={{ maxWidth: this.props.maxWidth }}
        >
          {this.props.children}
        </span>
      );
    }

    return (
      <Tooltip content={this.props.children}>
        <span
          {...style('root', {}, this.props)}
          style={{maxWidth: this.props.maxWidth}}
        >
          {this.props.children}
        </span>
      </Tooltip>
    )
  }
};
