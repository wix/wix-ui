import * as React from 'react';
import { style, classes } from './Tickers.st.css';

export interface TickersProps {
  className?: string;
  /** set buttons as disabled */
  disabled?: boolean;
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
  handleIncrement = e => {
    e.preventDefault();
    this.props.onIncrement(e);
  };

  handleDecrement = e => {
    e.preventDefault();
    this.props.onDecrement(e);
  };

  render() {
    return (
      <div className={style(classes.root, {}, this.props.className)}>
        <button
          tabIndex={-1}
          type="button"
          onMouseDown={this.handleIncrement}
          className={classes.ticker}
          disabled={this.props.disabled}
          data-hook="ticker-button-up"
        >
          {this.props.tickerUpIcon}
        </button>
        <button
          tabIndex={-1}
          type="button"
          onMouseDown={this.handleDecrement}
          className={classes.ticker}
          disabled={this.props.disabled}
          data-hook="ticker-button-down"
        >
          {this.props.tickerDownIcon}
        </button>
      </div>
    );
  }
}
