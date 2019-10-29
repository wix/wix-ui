declare namespace __WSRTests {
  interface LoaderUniDriver extends BaseUniDriver {
    /** @deprecated Should be private */
    component: () => Promise<any>;
    getColor: () => Promise<__WSR.Loader.LoaderColor>;
    getText: () => Promise<string>;
    hasText: () => Promise<boolean>;
    isLarge: () => Promise<boolean>;
    isMedium: () => Promise<boolean>;
    isSmall: () => Promise<boolean>;
    isTiny: () => Promise<boolean>;
    isLoading: () => Promise<boolean>;
    isError: () => Promise<boolean>;
    isSuccess: () => Promise<boolean>;
    getStatusMessage: () => Promise<string>;
  }
}
