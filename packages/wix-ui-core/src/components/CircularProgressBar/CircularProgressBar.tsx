import * as React from 'react';
import {bool, element, oneOfType, number, string} from 'prop-types';
import style from './CircularProgressBar.st.css';
import {Arc} from './Arc';

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
  /** circle size in pixels */
  size?: number | string;
}

const FULL_PROGRESS = 100;
const NO_PROGRESS = 0;
const VIEWBOX_SIZE = 54;

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

const normalizeValue = (value: string | number) => {
  return typeof value === 'number' ? value : parseInt(value, 10) ? parseInt(value, 10) : NO_PROGRESS;
}

const normalizeSize = (size: string | number) => {
  const intSize = typeof size === 'number' ? size : parseInt(size, 10);
  return intSize && intSize > 0 ? intSize : VIEWBOX_SIZE;
}

const renderArcs = (props: CircularProgressBarProps) => {
  const { value, size } = props;
  const normalizedSize = normalizeSize(size);
  const normalizedValue = normalizeValue(value);
  return (
    <div className={style.arcsContainer}  style={{width: `${normalizedSize}px`, height: `${normalizedSize}px`}}>
      {resolveIndicationElement(props)}
      <Arc data-hook='progressarc-background' value={FULL_PROGRESS} className={style.backArc} strokeWidth={4} size={normalizedSize} />
      <Arc data-hook='progressarc-foreground' value={normalizedValue} className={style.foreArc} strokeWidth={4} size={normalizedSize} />
    </div>
  )
}

const normalizeProps = (props: CircularProgressBarProps) => {
  const value = normalizeValue(props.value);

  if (value >= FULL_PROGRESS) {
    return {...props, value: FULL_PROGRESS};
  }

  if (value < NO_PROGRESS) {
    return {...props, value: NO_PROGRESS};
  }

  return {...props, value};
}

export const CircularProgressBar: React.SFC<CircularProgressBarProps> = (props: CircularProgressBarProps) => {
  const {error, showProgressIndication} = props;
  const _props = normalizeProps(props);
  const success = _props.value === FULL_PROGRESS;
  const value = error && _props.errorLabel ? _props.errorLabel : `${Math.floor(_props.value)}%`;
  return (
    <div {...style('root', {error, success}, _props)}>
      {renderArcs(_props)}
      {showProgressIndication &&
        <div data-hook="progress-indicator" className={style.progressIndicator}>{value}</div>
      }
    </div>);
}

CircularProgressBar.displayName = 'CircularProgressBar';

CircularProgressBar.propTypes = {
  value: oneOfType([number, string]),
  error: bool,
  errorLabel: string,
  showProgressIndication: bool,
  errorIcon: element,
  successIcon: element,
  size: oneOfType([number, string]),
}

CircularProgressBar.defaultProps = {
  value: NO_PROGRESS,
  size: VIEWBOX_SIZE,
}
