declare namespace __WSRTests {
  interface StepperUniDriver extends BaseUniDriver {
    clickStep: (idx: number) => Promise<void>;
    hoverStep: (idx: number) => Promise<void>;
    getNumberOfSteps: () => Promise<number>;
    isStepActive: (id: number) => Promise<string | null>;
    getStepType: (idx: number) => Promise<string | null>;
  }
}
