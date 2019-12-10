declare namespace __WSRTests {
  interface TabsUniDriver extends BaseUniDriver {
    getTitles: () => Promise<Array<string>>;
    clickTabAt: () => Promise<void>;
    getActiveTabIndex: () => Promise<number>;
    isDefaultType: () => Promise<boolean>;
    getItemsContainerClassList: () => Promise<DOMTokenList>;
    getDataHook: () => Promise<string>;
    getItemsWidth: () => Promise<Set<string>>;
    hasDivider: () => Promise<boolean>;
    getSideContent: Promise<Array<import('wix-ui-test-utils/unidriver').UniDriver | null>>;
    getItemsMaxWidths: () => Promise<Array<string>>;
  }
}
