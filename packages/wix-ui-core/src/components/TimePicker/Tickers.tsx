import * as React from 'react';
import {string, func, node} from 'prop-types';
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

export const Tickers: React.SFC<TickersProps> = props => (
  <div {...style('root', {}, props)}>
    <button tabIndex={-1} type="button" onClick={props.onIncrement} className={style.ticker} data-hook="ticker-button-up">
      {props.tickerUpIcon}
    </button>
    <button tabIndex={-1} type="button" onClick={props.onDecrement} className={style.ticker} data-hook="ticker-button-down">
      {props.tickerDownIcon}
    </button>
  </div>
);

Tickers.displayName = 'Tickers';

Tickers.propTypes = {
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
