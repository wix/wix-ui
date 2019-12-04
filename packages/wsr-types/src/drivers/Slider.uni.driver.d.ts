declare namespace __WSRTests {
  interface SliderUniDriver extends BaseUniDriver {
    isDotSelected: (value: number) => Promise<boolean>;
    numOfSliderDots: () => Promise<number>;
    numOfSliderHandles: () => Promise<number>;
    getToolTipValue: () => Promise<string>;
    hoverHandle: (payload: {handleIndex: number}) => Promise<void>;
    unHoverHandle: (payload: {handleIndex: number}) => Promise<void>;
    isDisabled: () => Promise<boolean>;
  }
}
