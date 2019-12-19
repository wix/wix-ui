declare namespace __WSRTests {
  interface CircularProgressBarUniDriver
    extends __WUC.CircularProgressBarUniDriver {
    isTooltipShown: () => Promise<boolean>;
    getTooltip: () => __WUC.TooltipUniDriver;
    isErrorIconShown: () => Promise<boolean>;
    isSuccessIconShown: () => Promise<boolean>;
    getSize: () => Promise<__WSR.CircularProgressBar.CircularProgressBarSize>;
    getTooltipErrorMessage: () => Promise<any>;
  }
}
