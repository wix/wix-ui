/**
 * ProgressBar data-hook props used for testing.
 */
export enum ProgressBarDataHooks {
  container = 'progressbar-container',
  background = 'progressbar-background',
  foreground = 'progressbar-foreground',
  progressIndicator = 'progress-indicator',
  successIcon = 'success-icon',
  errorIcon = 'error-icon',
  progressPercentage = 'progress-percentages',
}

/**
 * ProgressBar attribute keys used to store internal data (current value, min, max etc...)
 */
export enum ProgressBarDataKeys {
  value = 'data-progress-value',
  min = 'data-progress-min-value',
  max = 'data-progress-max-value',
}

export enum ProgressBarAriaKeys {
  valuenow = 'aria-valuenow',
  valuemax = 'aria-valuemax',
  valuemin = 'aria-valuemin',
  valuetext = 'aria-valuetext',
  live = 'aria-live',
}
