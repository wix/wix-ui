import * as React from 'react';
import {BaseProps} from '../../types/BaseProps';

export interface StepProps extends BaseProps, React.LiHTMLAttributes<any> {
    active: boolean;
    visited: boolean;
}
export type GetStepProps = (stepIndex: number, overrides?: Partial<StepProps>) => StepProps
export interface ChildrenArgs {
    getStepProps: GetStepProps;
}
export interface StepperProps {
    activeStep: number;
    children?: (args: ChildrenArgs) => JSX.Element;
}

export class Stepper extends React.PureComponent<StepperProps> {

    getStepProps(): GetStepProps {
        return (stepIndex: number, overrides: Partial<StepProps> = {}) => ({
            active: this.props.activeStep === stepIndex,
            visited: this.props.activeStep > stepIndex,
            ...overrides
        });
    }
    render() {
        const {children} = this.props;
        return children({getStepProps: this.getStepProps()});
    }
}