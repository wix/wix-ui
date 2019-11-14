declare namespace __WSRTests {
  interface ImageViewerUniDriver extends BaseUniDriver {
    updateExists: () => Promise<boolean>;
    updateButtonExists: () => Promise<boolean>;
    removeButtonExists: () => Promise<boolean>;
    clickAdd: () => Promise<void>;
    clickUpdate: () => Promise<void>;
    clickRemove: () => Promise<void>;
    getContainerStyles: () => Promise<string | null>;
    getAddTooltipContent: () => Promise<string>;
    getUpdateTooltipContent: () => Promise<string>;
    getRemoveTooltipContent: () => Promise<string>;
    getErrorTooltipContent: () => Promise<string>;
    isDisabled: () => Promise<boolean>;
    isAddItemVisible: () => Promise<boolean>;
    isLoaderVisible: () => Promise<boolean>;
    isErrorVisible: () => Promise<boolean>;
    isImageLoaded: () => Promise<boolean>;
    isImageVisible: Promise<boolean>;
    isPreviousImageVisible: () => Promise<boolean>;
    getImageUrl: () => Promise<string | null>;
    getPreviousImageUrl: () => Promise<string | null>;
    hover: () => Promise<void>;
  }
}
