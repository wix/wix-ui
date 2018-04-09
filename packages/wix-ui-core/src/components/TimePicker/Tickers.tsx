import * as React from 'react';
import {func} from 'prop-types';
import style from './Tickers.st.css';
import {TickerUp, TickerDown} from 'wix-ui-icons-common';

export interface TickersProps {
  className?: string;
  /** increment handler */
  onIncrement?: React.MouseEventHandler<HTMLButtonElement>;
  /** decrement handler */
  onDecrement?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Tickers: React.SFC<TickersProps> = (props) => (
  <div {...style('root', {}, props)}>
    <button onClick={props.onIncrement} className={style.ticker}>
      <TickerUp width={10} height={5} fill="none"/>
    </button>
    <button onClick={props.onDecrement} className={style.ticker}>
      <TickerDown width={10} height={5} fill="none"/>
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
