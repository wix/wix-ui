declare namespace __WSRTests {
  interface PageHeaderDriver extends BaseDriver {
    hasClass: (className: string) => boolean;
    titleText: () => string;
    isTitleExists: () => boolean;
    subtitleText: () => string;
    isSubtitleExists: () => boolean;
    isBreadcrumbsExists: () => boolean;
    breadcrumbsText: () => string;
    isActionBarExists: () => boolean;
    isBackButtonExists: () => boolean;
    clickBackButton: () => void;
  }
}
