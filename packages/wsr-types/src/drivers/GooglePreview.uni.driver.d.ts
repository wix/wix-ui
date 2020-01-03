declare namespace __WSRTests {
  interface GooglePreviewUniDriver extends BaseUniDriver {
    getPreviewUrl: () => Promise<string>;
    getTitle: () => Promise<string>;
    getDescription: () => Promise<string>;
  }
}
