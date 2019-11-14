declare namespace __WSRTests {
  interface BreadcrumbsDriver extends BaseDriver {
    breadcrumbsLength: () => number;
    breadcrumbContentAt: (position: string) => string;
    clickBreadcrumbAt: (position: number) => void;
    getActiveItemId: () => number;
    isLarge: () => boolean;
    isMedium: () => boolean;
    isOnWhiteBackground: () => boolean;
    isOnGrayBackground: () => boolean;
    isOnDarkBackground: () => boolean;
    getLabelClassList: (position: number) => string;
    isActiveLinkAt: (index: number) => boolean;
  }
}
