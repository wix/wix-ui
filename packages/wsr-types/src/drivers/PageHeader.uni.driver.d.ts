declare namespace __WSRTests {
  interface PageHeaderUniDriver extends BaseUniDriver {
    hasClass: (name: string) => Promise<boolean>;
    titleText: () => Promise<string>;
    isTitleExists: () => Promise<boolean>;
    subtitleText: () => Promise<string>;
    isSubtitleExists: () => Promise<boolean>;
    isBreadcrumbsExists: () => Promise<boolean>;
    breadcrumbsText: () => Promise<string>;
    isActionBarExists: () => Promise<boolean>;
    isBackButtonExists: () => Promise<boolean>;
    clickBackButton: () => Promise<void>;
  }
}
