declare namespace __WSRTests {
  interface SliderDriver extends BaseDriver {
    isDotSelected: (value: number) => boolean;
    numOfSliderDots: () => number;
    numOfSliderHandles: () => number;
    getToolTipValue: () => string;
    hoverHandle: (payload: {handleIndex: number}) => void;
    unHoverHandle: (payload: {handleIndex: number}) => void;
    isDisabled: () => boolean;
  }
}
