declare namespace __WSRTests {
  interface CalendarPanelFooterUniDriver extends BaseUniDriver {
    isPrimaryButtonDisabled: () => Promise<boolean>;
    getSelectedDaysText: () => Promise<string>;
    getPrimaryActionButtonLabel: () => Promise<string>;
    getSecondaryActionButtonLabel: () => Promise<string>;
    clickOnPrimaryButton: () => Promise<void>;
    clickOnSecondaryButton: () => Promise<void>;
  }
}
