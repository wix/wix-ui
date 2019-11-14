declare namespace __WSRTests {
  interface ImageViewerDriver<T> extends BaseDriver {
    getElement: () => T;
    element: () => T;
    updateExists: () => boolean;
    updateButtonExists: () => boolean;
    removeButtonExists: () => boolean;
    clickAdd: () => void;
    clickUpdate: () => void;
    clickRemove: () => void;
    getContainerStyles: () => string | null;
    getAddTooltipContent: () => string;
    getUpdateTooltipContent: () => string;
    getRemoveTooltipContent: () => string;
    getErrorTooltipContent: () => string;
    isDisabled: () => boolean;
    isAddItemVisible: () => boolean;
    isLoaderVisible: () => boolean;
    isErrorVisible: () => boolean;
    isImageLoaded: () => boolean;
    isImageVisible: () => boolean;
    isPreviousImageVisible: () => boolean;
    getImageUrl: () => string | null;
    getPreviousImageUrl: () => string | null;
    hover: () => void;
  }
}
