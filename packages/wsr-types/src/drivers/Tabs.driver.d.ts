declare namespace __WSRTests {
  interface TabsDriver extends BaseDriver {
    getTitles: () => Array<string>;
    clickTabAt: (index: number) => void;
    getActiveTabIndex: () => number;
    isDefaultType: () => boolean;
    getItemsContainerClassList: () => DOMTokenList;
    getDataHook: () => string;
    getItemsWidth: () => Set<string>;
    hasDivider: () => boolean;
    getSideContent: Array<import('wix-ui-test-utils/unidriver').UniDriver | null>;
    getItemsMaxWidths: () => Array<string>;
  }
}
