declare namespace __WSRTests {
  interface EmptyStateDriver extends BaseDriver {
    element: () => HTMLElement;
    getTitleText: () => string;
    getSubtitleText: () => string;
    hasTheme: (themeName: __WSR.EmptyState.EmptyStateTheme) => boolean;
    getImageUrl: () => string;
    getImageContainerClassName: () => string;
    imageNodeExists: () => boolean;
    childrenContentExists: () => boolean;
  }
}
