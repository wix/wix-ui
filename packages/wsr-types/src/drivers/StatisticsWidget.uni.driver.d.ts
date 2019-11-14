declare namespace __WSRTests {
  interface StatisticsWidgetUniDriver extends BaseUniDriver {
    getItemsCount: () => Promise<number>;
    clickStatistics: (index: number) => Promise<void>;
    getValue: (index: number) => Promise<string | null>;
    getValueInShort: (index: number) => Promise<string | null>;
    getDescription: (index: number) => Promise<string | null>;
    getDescriptionInfo: (index: number) => Promise<string>;
    getChildren: (
      index: number,
      hook: string
    ) => import("wix-ui-test-utils/unidriver").UniDriver;
    getPercentage: (index: number) => Promise<number | null>;
    isPercentageInverted: (index: number) => Promise<boolean>;
  }
}
