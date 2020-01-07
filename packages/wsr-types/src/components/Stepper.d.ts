declare namespace __WSR {
  namespace Stepper {
    export interface StepperProps {
      dataHook?: string;
      onClick?: (index: number) => void;
      activeStep: number;
      steps: StepperStep[];
      type?: StepperType;
      fit?: StepperFit;
    }

    export class Stepper extends React.PureComponent<StepperProps> {}

    export interface StepperStep {
      text: string;
      type?: StepperStepType;
    }

    export type StepperType = "circle" | "text";
    export type StepperFit = "compact" | "stretched";
    export type StepperStepType = "completed" | "disabled" | "error" | "normal";
  }
}

declare module "wix-style-react" {
  export import Stepper = __WSR.Stepper.Stepper;
  export import StepperProps = __WSR.Stepper.StepperProps;
}

declare module "wix-style-react/Stepper" {
  export interface StepperProps extends __WSR.Stepper.StepperProps {}
  export default __WSR.Stepper.Stepper;
}
