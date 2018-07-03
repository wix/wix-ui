import * as React from 'react';

export interface StepProps {
    active: boolean;
    visited: boolean;
}
export type GetStepProps = (stepIndex: number) => StepProps
export interface ChildrenArgs {
    getStepProps: GetStepProps;
}
export interface StepperProps {
    activeStep: number;
    children?: (args: ChildrenArgs) => JSX.Element;
}

export class Stepper extends React.PureComponent<StepperProps> {

    getStepProps() {
        return (stepIndex: number) => ({
            active: this.props.activeStep === stepIndex,
            visited: this.props.activeStep > stepIndex
        });
    }
    render() {
        const {children} = this.props;
        return children({getStepProps: this.getStepProps()});
    }
}