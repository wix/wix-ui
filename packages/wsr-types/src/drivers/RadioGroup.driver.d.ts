declare namespace __WSRTests {
  interface RadioGroupDriver extends BaseDriver {
    selectByValue: (value: string | number) => void;
    selectByIndex: (index: number) => void;
    getRadioValueAt: (index: number) => string | number;
    getRadioAtIndex: (index: number) => HTMLElement;
    getSelectedValue: () => string | number | null;
    isRadioDisabled: (index: number) => boolean;
    getClassOfLabelAt: (index: number) => String;
    isVerticalDisplay: () => boolean;
    isHorizontalDisplay: () => boolean;
    isButtonType: () => boolean;
    spacing: () => string;
    lineHeight: () => string;
    getNumberOfRadios: () => number;
  }
}
