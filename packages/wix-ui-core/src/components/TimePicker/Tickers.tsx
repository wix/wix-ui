import * as React from 'react';
import {func} from 'prop-types';
import style from './Tickers.st.css';

const ArrowUp = props => (
  <svg width="10" height="5" viewBox="0 0 10 4" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 4L5 0 1 4" fill="none" fillRule="evenodd">
    </path>
  </svg>
);

const ArrowDown = props => (
  <svg width="10" height="5" viewBox="0 0 10 4" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 0L5 4 1 0" fill="none" fillRule="evenodd">
    </path>
  </svg>
);

export interface TickersProps {
  /** increment handler */
  onIncrement?: React.MouseEventHandler<HTMLButtonElement>;
  /** decrement handler */
  onDecrement?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Tickers:React.SFC<TickersProps> = (props) => (
  <div {...style('root', {}, props)}>
    <button onClick={props.onIncrement} className={style.ticker}>
      <ArrowUp />
    </button>
    <button onClick={props.onDecrement} className={style.ticker}>
      <ArrowDown />
    </button>
  </div>
);

Tickers.displayName = 'Tickers';

Tickers.propTypes = {
  /** increment handler */
  onIncrement: func,
  /** decrement handler */
  onDecrement: func
};
