declare namespace __WSRTests {
  interface RichTextInputAreaUniDriver extends BaseUniDriver {
    isDisabled: () => Promise<boolean>;
    hasError: () => Promise<boolean>;
    getContent: () => Promise<string>;
    getPlaceholder: () => Promise<string | null>;
    getErrorMessage: () => Promise<string>;
    enterText: (value: string) => Promise<void>;
  }
}
