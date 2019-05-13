import * as React from 'react';
import style from './LinearProgressBar.st.css';
import {ProgressBarDataHooks, ProgressBarDataKeys} from './DataHooks';

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
  /** minimum value for progress bar, default value: 0 */
  min?: number;
}

const FULL_PROGRESS = 100;
const NO_PROGRESS = 0;

const resolveIndicationElement = (props: LinearProgressBarProps) => {
  const wrapped = (dataHook: string, children: JSX.Element) => (
    <div data-hook={dataHook} className={style.indicationContainer}>
      {children}
    </div>
  );

  if (props.error && props.errorIcon) {
    return wrapped(ProgressBarDataHooks.errorIcon, props.errorIcon);
  }

  if (props.value === FULL_PROGRESS && props.successIcon) {
    return wrapped(ProgressBarDataHooks.successIcon, props.successIcon);
  }

  return wrapped(
    ProgressBarDataHooks.progressPercentage,
    <span>{`${props.value}%`}</span>
  );
};

const renderBarSection = (value: number | string) => {
  const progressWidth = {width: `${value}%`};
  return (
    <div
      data-hook={ProgressBarDataHooks.container}
      className={style.barContainer}
    >
      <div
        data-hook={ProgressBarDataHooks.background}
        className={style.barBackground}
      />
      <div
        data-hook={ProgressBarDataHooks.foreground}
        style={progressWidth}
        className={style.barForeground}
      />
    </div>
  );
};

const normalizeProps = (props: LinearProgressBarProps) => {
  const value = parseInt(props.value as any, 10);

  if (props.value >= FULL_PROGRESS) {
    return {...props, value: FULL_PROGRESS};
  }

  if (props.value < 0) {
    return {...props, value: NO_PROGRESS};
  }

  return {...props, value};
};

const getDataAttributes = (props: LinearProgressBarProps) => {
  return {
    [ProgressBarDataKeys.value]: props.value,
    [ProgressBarDataKeys.min]: props.min,
  };
};

export const LinearProgressBar: React.FunctionComponent<
  LinearProgressBarProps
> = (props: LinearProgressBarProps) => {
  const {error, showProgressIndication} = props;
  const _props = normalizeProps(props);
  const success = _props.value === FULL_PROGRESS;
  return (
    <div
      {...getDataAttributes(_props)}
      data-min={_props.min}
      {...style('root', {error, success}, _props)}
    >
      {renderBarSection(_props.value)}

      {showProgressIndication && (
        <div
          data-hook={ProgressBarDataHooks.progressIndicator}
          className={style.progressIndicationSection}
        >
          {resolveIndicationElement(_props)}
        </div>
      )}
    </div>
  );
};

LinearProgressBar.displayName = 'LinearProgressBar';

LinearProgressBar.defaultProps = {
  value: 0,
};
