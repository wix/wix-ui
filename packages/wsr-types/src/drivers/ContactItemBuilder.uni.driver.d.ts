declare namespace __WSRTests {
  interface ContactItemBuilderUniDriver extends BaseUniDriver {
    getTitle: () => Promise<string>,
    getSubtitle: () => Promise<string>,
  }
}
