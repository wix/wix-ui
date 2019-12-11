declare namespace __WSRTests {
  interface ColorPickerDriver extends BaseDriver {
    confirm: () => void;
    cancel: () => void;
    clickOnPreviousColor: () => void;
    historyPanelExists: () => boolean;
    historyCurrentColor: () => string;
    historyPreviousColor: () => string;
  }
}
