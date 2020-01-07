declare namespace __WSRTests {
  interface StepperUniDriver extends BaseUniDriver {
    getType: () => Promise<__WSR.Stepper.StepperType>;
    getFit: () => Promise<__WSR.Stepper.StepperFit>;
    clickStep: (index: number) => Promise<void>;
    hoverStep: (index: number) => Promise<void>;
    getNumberOfSteps: () => Promise<number>;
    isStepActive: (index: number) => Promise<boolean>;
    getStepType: (index: number) => Promise<__WSR.Stepper.StepperStepType>;
    getStepText: (index: number) => Promise<string>;
  }
}
