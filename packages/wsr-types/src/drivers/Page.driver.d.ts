declare namespace __WSRTests {
  interface PageDriver extends BaseDriver {
    hasClass: (className: string) => boolean;
    backgroundImageExists: () => boolean;
    gradientClassNameExists: () => boolean;
    tailExists: () => boolean;
    gradientContainerHeight: () => string;
    getPageHtml: () => string;
  }
}
