declare namespace __WSRTests {
  interface EmptyStateUniDriver extends BaseUniDriver {
    element: () => Promise<any>;
    getTitleText: () => Promise<string>;
    getSubtitleText: () => Promise<string>;
    hasTheme: (themeName: __WSR.EmptyState.EmptyStateTheme) => Promise<boolean>;
    getImageUrl: () => (name: string) => Promise<string>;
    getImageContainerClassName: () => Promise<any>;
    imageNodeExists: () => Promise<boolean>;
    childrenContentExists: () => Promise<boolean>;
  }
}
