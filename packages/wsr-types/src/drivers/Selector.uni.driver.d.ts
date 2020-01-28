declare namespace __WSRTests {
  interface SelectorUniDriver extends BaseUniDriver {
    isImageTiny: () => Promise<boolean>;
    isImageSmall: () => Promise<boolean>;
    isImagePortrait: () => Promise<boolean>;
    isImageLarge: () => Promise<boolean>;
    isImageCinema: () => Promise<boolean>;
    isImageCircle: () => Promise<boolean>;
    isImageRectangular: () => Promise<boolean>;
    isDisabled: () => Promise<boolean>;
    toggleType: () => Promise<string>;
    isChecked: () => Promise<boolean>;
    hasImage: () => Promise<boolean>;
    getImage: () => Promise<HTMLElement>;
    titleTextDriver: () => Promise<TextUniDriver>;
    subtitleTextDriver: () => Promise<TextUniDriver>;
    hasExtraNode: () => Promise<boolean>;
    getExtraNode: () => Promise<HTMLElement>;
    toggle: () => Promise<void>;
  }
}
