declare namespace __WSRTests {
  interface ModalSelectorLayoutDriver extends BaseDriver {
    mainLoaderDriver: () => LoaderDriver;
    nextPageLoaderDriver: () => LoaderDriver;
    cancelButtonDriver: () => any; // TODO: update when deprecated button types are added
    okButtonDriver: () => any; // TODO: update when deprecated button types are added
    searchDriver: () => any; // TODO: update when search types are added
    subtitleTextDriver: () => TextDriver;
    getTitle: () => string;
    clickOnClose: () => void;
    showsEmptyState: () => boolean;
    getEmptyState: () => HTMLElement;
    showsNoResultsFoundState: () => boolean;
    getNoResultsFoundState: () => HTMLElement;
    listExists: () => boolean;
    numberOfItemsInList: () => number;
    getSelectorDriverAt: (i: number) => SelectorDriver;
    scrollDown: () => boolean;
    footerSelector: () => CheckboxDriver;
  }
}
