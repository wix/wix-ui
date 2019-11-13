declare namespace __WSRTests {
  interface LinearProgressBarDriver extends __WUC.LinearProgressBarDriver {
    isTooltipShown: () => boolean;
    getTooltip: () => __WUB.TooltipDriver;
    isErrorIconShown: () => boolean;
    isSuccessIconShown: () => boolean;
    getTooltipErrorMessage: () => Promise<string>;
  }
}
