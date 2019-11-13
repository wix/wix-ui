declare namespace __WSRTests {
  interface SelectorDriver extends BaseDriver {
    isImageTiny: () => boolean;
    isImageSmall: () => boolean;
    isImagePortrait: () => boolean;
    isImageLarge: () => boolean;
    isImageCinema: () => boolean;
    isImageCircle: () => boolean;
    isImageRectangular: () => boolean;
    isDisabled: () => boolean;
    toggleType: () => string;
    isChecked: () => boolean;
    hasImage: () => boolean;
    getImage: () => HTMLElement;
    titleTextDriver: () => TextDriver;
    subtitleTextDriver: () => TextDriver;
    hasExtraNode: () => boolean;
    getExtraNode: () => HTMLElement;
    toggle: () => void;
  }
}
