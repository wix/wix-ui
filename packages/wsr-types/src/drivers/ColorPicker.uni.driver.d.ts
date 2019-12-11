declare namespace __WSRTests {
  interface ColorPickerUniDriver extends BaseUniDriver {
    confirm: () => Promise<void>;
    cancel: () => Promise<void>;
    clickOnPreviousColor: () => Promise<void>;
    historyPanelExists: () => Promise<boolean>;
    historyCurrentColor: () => Promise<string>;
    historyPreviousColor: () => Promise<string>;
    clickAddColor: () => Promise<void>;
    getChildren: () => Promise<import('wix-ui-test-utils/unidriver').UniDriver | null>,
    selectRgbTab: Promise<void>;
    selectHsbTab: Promise<void>;
  }
}
