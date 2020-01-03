declare namespace __WSRTests {
  interface CarouselDriver extends BaseDriver {
    isLoading: () => boolean;
    getChildren: () => NodeListOf<HTMLElement>;
    getImages: () => string[];
  }
}
