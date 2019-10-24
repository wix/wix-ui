declare namespace __WSRTests {
  interface LoaderDriver extends BaseDriver {
    component: () => HTMLElement;
    getColor: () => __WSR.Loader.LoaderColor;
    getText: () => string;
    hasText: () => boolean;
    isLarge: () => boolean;
    isMedium: () => boolean;
    isSmall: () => boolean;
    isTiny: () => boolean;
    isLoading: () => boolean;
    isError: () => boolean;
    isSuccess: () => boolean;
    getStatusMessage: () => Promise<string>;
  }
}
