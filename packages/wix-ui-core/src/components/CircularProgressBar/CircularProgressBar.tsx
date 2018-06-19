import * as React from 'react';
import {bool, element, oneOfType, number, string} from 'prop-types';
import style from './CircularProgressBar.st.css';
import Arc from './Arc';

export interface CircularProgressBarProps {
  /** represent the progress state in percentages (0 - no progress, 100 - progress completed) */
  value?: number | string;
  /** should be true if had failure during the progress */
  error?: boolean;
  /** label to display when an error happens */
  errorLabel?: string;
  /** when set to true, an indication of the progress state will be presented along side the progress bar */
  showProgressIndication?: boolean;
  /** an indication icon (any react component) that will be presented when 'error' and 'showProgressIndication' are set to true */
  errorIcon?: JSX.Element;
  /** an indication icon (any react component) that will be presented when 'showProgressIndication' are set to true and 'value' is 100 */
  successIcon?: JSX.Element;
}

const FULL_PROGRESS = 100;
const NO_PROGRESS = 0;
const FULL_PROGRESS_ANGLE = 359.9;
const NO_PROGRESS_ANGLE = 0;
const DEFAULT_SIZE = 54;

const resolveIndicationElement = (props: CircularProgressBarProps) => {
  const wrapped = (dataHook: string, children: JSX.Element) =>
    <div data-hook={dataHook} className={style.statusIndicator} >{children}</div>;

  if (props.error && props.errorIcon) {
    return wrapped('error-icon', props.errorIcon);
  }

  if (props.value === FULL_PROGRESS && props.successIcon) {
    return wrapped('success-icon', props.successIcon);
  }
}

const renderArcs = (props: CircularProgressBarProps) => {
  const { value } = props;
  const normalizedValue = typeof value === 'number' ? value : parseInt(value, 10);
  const angleValue = (normalizedValue * 3.6) - 0.1;
  return (
    <div className={style.arcsContainer} style={{width: `${DEFAULT_SIZE}px`, height: `${DEFAULT_SIZE}px`}}>
      {resolveIndicationElement(props)}
      <Arc angle={FULL_PROGRESS_ANGLE} className={style.backArc} strokeWidth={4} viewBoxSize={DEFAULT_SIZE} />
      <Arc angle={angleValue} value={normalizedValue} className={style.foreArc} strokeWidth={4} viewBoxSize={DEFAULT_SIZE} />
    </div>
  )
}

const normalizeProps = (props: CircularProgressBarProps) => {
  const value = parseInt(props.value as any);

  if (props.value >= FULL_PROGRESS) {
    return {...props, value: FULL_PROGRESS};
  }

  if (props.value < 0) {
    return {...props, value: NO_PROGRESS};
  }

  return {...props, value};
}

export const CircularProgressBar: React.SFC<CircularProgressBarProps> = (props: CircularProgressBarProps) => {
  const {error, showProgressIndication} = props;
  const _props = normalizeProps(props);
  const success = _props.value === FULL_PROGRESS;
  const value = error && _props.errorLabel ? _props.errorLabel : `${_props.value}%`;

  return (
    <div {...style('root', {error, success}, _props)}>
      {renderArcs(_props)}
      {showProgressIndication &&
        <div data-hook="progress-indicator" className={style.progressIndicator}>
          <div data-hook="progress-percentages" className={style.indicationContainer} >
            <span className={style.value}>{value}</span>
          </div>
        </div>
      }
    </div>);
}

CircularProgressBar.propTypes = {
  value: oneOfType([number, string]),
  error: bool,
  errorLabel: string,
  showProgressIndication: bool,
  errorIcon: element,
  successIcon: element,
}

CircularProgressBar.defaultProps = {
  value: 0,
}
