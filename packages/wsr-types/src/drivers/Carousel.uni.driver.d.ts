declare namespace __WSRTests {
  interface CarouselUniDriver extends BaseUniDriver {
    isLoading: () => Promise<boolean>;
    getChildren: () => import("@unidriver/core").UniDriverList;
    getImages: () => Array<Promise<string | null>>;
  }
}
