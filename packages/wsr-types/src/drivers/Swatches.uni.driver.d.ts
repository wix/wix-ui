declare namespace __WSRTests {
  interface SwatchesUniDriver extends BaseUniDriver {
    getSwatchCount:  () => Promise<number>;
    getSwatch: (index: number) => Promise<FillPreviewUniDriver>;
    clickEmptySwatch: () => Promise<void>;
    isSwatchSelectedAt: (index:number) => Promise<boolean>;
    isEmptySwatchSelected: () => Promise<boolean>;
    addButtonExists: () => Promise<boolean>;
  }
}
