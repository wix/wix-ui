declare namespace __WSRTests {
  interface FloatingNotificationUniDriver extends BaseUniDriver {
    clickButton: () => Promise<void>;
    getButtonLabel: () => Promise<string>;
    clickTextButton: () => Promise<void>;
    getTextButtonLabel: () => Promise<string>;
    clickCloseButton: () => Promise<void>;
    getText: () => Promise<string>;
    isButtonAs: (as: keyof HTMLElementTagNameMap) => Promise<boolean>;
    getButtonHref: () => Promise<string | null>;
    getButtonAttr: (attrName: string) => Promise<string | null>;
    isTextButtonAs: (as: keyof HTMLElementTagNameMap) => Promise<boolean>;
    getTextButtonHref: () => Promise<string | null>;
    getTextButtonAttr: (attrName: string) => Promise<string | null>;
  }
}
