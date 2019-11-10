declare namespace __WSRTests {
  interface ModalDriver extends BaseDriver {
    element: () => HTMLElement | import('enzyme').ReactWrapper;
    isOpen: () => boolean;
    isThemeExist: (theme: __WSR.Modal.ModalTheme) => boolean;
    getChildBySelector: (selector: string) => HTMLElement | null;
    isScrollable: () => boolean;
    closeButtonExists: () => boolean;
    clickOnOverlay: () => boolean;
    clickOnCloseButton: () => boolean;
    getContentStyle: () => CSSStyleDeclaration;
    getContentLabel: () => string | null;
    getZIndex: () => string | null;
  }
}
