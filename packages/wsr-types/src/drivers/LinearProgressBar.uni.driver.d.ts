declare namespace __WSRTests {
  interface LinearProgressBarUniDriver
    extends __WUC.LinearProgressBarUniDriver {
    isTooltipShown: () => Promise<boolean>;
    getTooltip: () => __WUC.TooltipUniDriver;
    isErrorIconShown: () => Promise<boolean>;
    isSuccessIconShown: () => Promise<boolean>;
    getTooltipErrorMessage: () => Promise<string>;
  }
}
