declare namespace __WSRTests {
  interface StepperUniDriver extends BaseUniDriver {
    getType: () => Promise<string>;
    getFit: () => Promise<string>;
    clickStep: (index: number) => Promise<void>;
    hoverStep: (index: number) => Promise<void>;
    getNumberOfSteps: () => Promise<number>;
    isStepActive: (index: number) => Promise<boolean>;
    getStepType: (index: number) => Promise<string>;
    getStepText: (index: number) => Promise<string>;
  }
}
