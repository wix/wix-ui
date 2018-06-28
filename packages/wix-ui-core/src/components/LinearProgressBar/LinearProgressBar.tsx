import * as React from 'react';
import {bool, element, oneOfType, number, string} from 'prop-types';
import style from './LinearProgressBar.st.css';

export interface LinearProgressBarProps {
  /** represent the progress state in percentages (0 - no progress, 100 - progress completed) */
  value?: number | string;
  /** should be true if had failure during the progress */
  error?: boolean;
  /** when set to true, an indication of the progress state will be presented along side the progress bar */
  showProgressIndication?: boolean;
  /** an indication icon (any react component) that will be presented when 'error' and 'showProgressIndication' are set to true */
  errorIcon?: JSX.Element;
  /** an indication icon (any react component) that will be presented when 'showProgressIndication' are set to true and 'value' is 100 */
  successIcon?: JSX.Element;
}

const FULL_PROGRESS = 100;
const NO_PROGRESS = 0;

const resolveIndicationElement = (props: LinearProgressBarProps) => {
  const wrapped = (dataHook: string, children: JSX.Element) =>
    <div data-hook={dataHook} className={style.indicationContainer} >{children}</div>;

  if (props.error && props.errorIcon) {
    return wrapped('error-icon', props.errorIcon);
  }

  if (props.value === FULL_PROGRESS && props.successIcon) {
    return wrapped('success-icon', props.successIcon);
  }

  return wrapped('progress-percentages', <span>{`${props.value}%`}</span>);
}

const renderBarSection = (value: number | string) => {
  const progressWidth = { width: `${value}%` };
  return (
    <div className={style.barContainer}>
      <div data-hook="progressbar-background" className={style.barBackground} />
      <div data-hook="progressbar-foreground" style={progressWidth} className={style.barForeground} />
    </div>
  )
}

const normalizeProps = (props: LinearProgressBarProps) => {
  const value = parseInt(props.value as any);

  if (props.value >= FULL_PROGRESS) {
    return {...props, value: FULL_PROGRESS};
  }

  if (props.value < 0) {
    return {...props, value: NO_PROGRESS};
  }

  return {...props, value};
}

export const LinearProgressBar: React.SFC<LinearProgressBarProps> = (props: LinearProgressBarProps) => {
  const {error, showProgressIndication} = props;
  const _props = normalizeProps(props);
  const success = _props.value === FULL_PROGRESS;

  return (
    <div {...style('root', {error, success}, _props)} >

      {renderBarSection(_props.value)}

      {showProgressIndication && <div data-hook="progress-indicator" className={style.progressIndicationSection}>
        {resolveIndicationElement(_props)}
      </div>}

    </div>);
}

LinearProgressBar.displayName = 'LinearProgressBar';

LinearProgressBar.propTypes = {
  value: oneOfType([number, string]),
  error: bool,
  showProgressIndication: bool,
  errorIcon: element,
  successIcon: element,
}

LinearProgressBar.defaultProps = {
  value: 0,
}
