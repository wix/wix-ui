declare namespace __WSRTests {
  interface ToggleButtonUniDriver extends BaseUniDriver {
    isButtonDisabled: __WUC.ButtonNextDriver['isButtonDisabled'];
    getSkin: () => Promise<string | null>;
    isButtonSelected: () => Promise<boolean>;
    getTooltipText: () => Promise<string>;
  }
}
