import * as React from 'react';
import { style, classes } from './LinearProgressBar.st.css';
import {
  ProgressBarDataHooks,
  ProgressBarDataKeys,
  ProgressBarAriaKeys,
} from './DataHooks';

export interface LinearProgressBarProps {
  /** represent the progress state in percentages (min || 0 - no progress, max || 100 - progress completed) */
  value?: number | string;
  /** should be true if had failure during the progress */
  error?: boolean;
  /** when set to true, an indication of the progress state will be presented along side the progress bar */
  showProgressIndication?: boolean;
  /** an indication icon (any react component) that will be presented when 'error' and 'showProgressIndication' are set to true */
  errorIcon?: JSX.Element;
  /** an indication icon (any react component) that will be presented when 'showProgressIndication' are set to true and 'value' is equal or bigger than 'max' */
  successIcon?: JSX.Element;
  /** minimum value for progress bar, default value: 0 */
  min?: number;
  /** maximum value for progress bar, default value: 100 */
  max?: number;
  /** Number of decimal points to keep when normalizing value */
  precision?: number;
  /** Applied as data-hook HTML attribute that can be used to create driver in testing */
  'data-hook'?: string;
}

const FULL_PROGRESS = 100;
const NO_PROGRESS = 0;

const resolveIndicationElement = (props: LinearProgressBarProps) => {
  const wrapped = (dataHook: string, children: JSX.Element) => (
    <div data-hook={dataHook} className={classes.indicationContainer}>
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
    <span className={classes.progressPercentage}>{`${props.value}%`}</span>,
  );
};

const renderBarSection = (value: number | string) => {
  const progressWidth = { width: `${value}%` };
  return (
    <div
      data-hook={ProgressBarDataHooks.container}
      className={classes.barContainer}
    >
      <div
        data-hook={ProgressBarDataHooks.background}
        className={classes.barBackground}
      />
      <div
        data-hook={ProgressBarDataHooks.foreground}
        style={progressWidth}
        className={classes.barForeground}
      />
    </div>
  );
};

const getRelativeValue = (props: LinearProgressBarProps): number => {
  const { value, min, max, precision } = props;
  const relativeValue = ((+value - min) / (max - min)) * 100;
  return precision
    ? +relativeValue.toFixed(precision)
    : parseInt(relativeValue as any, 10);
};

const normalizeProps = (props: LinearProgressBarProps) => {
  if (props.value >= props.max) {
    return { ...props, value: FULL_PROGRESS };
  }

  if (
    props.value < props.min ||
    [undefined, null, ''].includes(props.value as string)
  ) {
    return { ...props, value: NO_PROGRESS };
  }

  return { ...props, value: getRelativeValue(props) };
};

const getDataAttributes = (
  props: LinearProgressBarProps,
): { [key in ProgressBarDataKeys]: number | string } => {
  return {
    [ProgressBarDataKeys.value]: props.value,
    [ProgressBarDataKeys.min]: props.min,
    [ProgressBarDataKeys.max]: props.max,
  };
};

const getAriaAttributes = (
  props: LinearProgressBarProps,
): {
  [key in ProgressBarAriaKeys]: React.HTMLAttributes<HTMLDivElement>[key];
} => {
  return {
    [ProgressBarAriaKeys.valuenow]: +props.value || NO_PROGRESS,
    [ProgressBarAriaKeys.valuemin]: +props.min,
    [ProgressBarAriaKeys.valuemax]: +props.max,
    [ProgressBarAriaKeys.valuetext]: props[ProgressBarAriaKeys.valuetext],
  };
};

export const LinearProgressBar: React.FunctionComponent<LinearProgressBarProps> = (
  props: LinearProgressBarProps,
) => {
  const { error, showProgressIndication, 'data-hook': dataHook } = props;
  const _props = normalizeProps(props);
  const success = _props.value === FULL_PROGRESS;
  return (
    <div
      {...getDataAttributes(_props)}
      {...getAriaAttributes(props)}
      data-min={_props.min}
      data-error={error}
      role="progressbar"
      className={style(classes.root, { error, success })}
      {...(dataHook && { 'data-hook': dataHook })}
    >
      {renderBarSection(_props.value)}

      {showProgressIndication && (
        <div
          data-hook={ProgressBarDataHooks.progressIndicator}
          className={classes.progressIndicationSection}
        >
          {resolveIndicationElement(_props)}
        </div>
      )}
    </div>
  );
};

LinearProgressBar.displayName = 'LinearProgressBar';

LinearProgressBar.defaultProps = {
  min: NO_PROGRESS,
  max: FULL_PROGRESS,
};
