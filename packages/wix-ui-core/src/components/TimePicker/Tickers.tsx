import * as React from 'react';
import {string, func, node, Requireable} from 'prop-types';
import style from './Tickers.st.css';

export interface TickersProps {
  className?: string;
  /** increment handler */
  onIncrement?: React.MouseEventHandler<HTMLButtonElement>;
  /** decrement handler */
  onDecrement?: React.MouseEventHandler<HTMLButtonElement>;
  /** up ticker icon */
  tickerUpIcon?: React.ReactNode;
  /** down ticker icon */
  tickerDownIcon?: React.ReactNode;
}

export class Tickers extends React.PureComponent<TickersProps> {
  static propTypes = {
    className: string,
    /** increment handler */
    onIncrement: func,
    /** decrement handler */
    onDecrement: func,
    /** up ticker icon */
    tickerUpIcon: node,
    /** down ticker icon */
    tickerDownIcon: node
  };

  handleIncrement = e => {
    e.preventDefault();
    this.props.onIncrement(e);
  }

  handleDecrement = e => {
    e.preventDefault();
    this.props.onDecrement(e);
  }

  render() {
    return (
      <div {...style('root', {}, this.props)}>
      <button tabIndex={-1} type="button" onMouseDown={this.handleIncrement} className={style.ticker} data-hook="ticker-button-up">
        {this.props.tickerUpIcon}
      </button>
      <button tabIndex={-1} type="button" onMouseDown={this.handleDecrement} className={style.ticker} data-hook="ticker-button-down">
        {this.props.tickerDownIcon}
      </button>
    </div>
    );
  }
};

