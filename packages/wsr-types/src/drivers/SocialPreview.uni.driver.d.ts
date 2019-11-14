declare namespace __WSRTests {
  interface SocialPreviewUniDriver extends BaseUniDriver {
    getTitle: () => Promise<string>,
    getPreviewUrl: () => Promise<string>,
    getDescription: () => Promise<string>,
  }
}
