declare namespace __WSRTests {
  interface CircularProgressBarDriver extends __WUC.CircularProgressBarDriver {
    isTooltipShown: () => boolean;
    getTooltip: () => __WUB.TooltipDriver;
    isErrorIconShown: () => boolean;
    isSuccessIconShown: () => boolean;
    getSize: () => __WSR.CircularProgressBar.CircularProgressBarSize;
    getTooltipErrorMessage: () => Promise<string>;
  }
}
