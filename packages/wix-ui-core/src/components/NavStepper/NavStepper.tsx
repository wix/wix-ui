import * as React from 'react';
import style from './NavStepper.st.css';
import {Stepper, StepProps} from '../../baseComponents/Stepper';
import {NavStep, ExternalNavStepProps} from './NavStep';
import {isReactElement} from '../../utils';
import {childrenOfType, nonNegativeInteger} from 'airbnb-prop-types';
import {arrayOf} from 'prop-types';

export {ExternalNavStepProps} from './NavStep';

export interface NavStepperProps {
    activeStep: number;
    onStepClick?: (stepIndex: number, e: any) => void
}

export class NavStepper extends React.PureComponent<NavStepperProps> {
    public static Step: React.ComponentClass<ExternalNavStepProps> = NavStep as any;

    static propTypes = {
        activeStep: nonNegativeInteger,
        children: childrenOfType(NavStep)
    }
    render() {
        const {activeStep, children} = this.props;

        return (
            <nav {...style('root', {}, this.props)}>
                <Stepper activeStep={activeStep}>
                    {({getStepProps}) => (
                        <ol className={style.steps}>
                            {
                                React.Children.map(children, (child, index) => {
                                    if (React.isValidElement(child)) {
                                        const stepProps: any = getStepProps(index, {...child.props, className: style.step});

                                        if (this.props.onStepClick && !(stepProps.active || stepProps.disabled)) {
                                            stepProps.onClick = (e: any) => this.props.onStepClick(index, e)
                                        }
                                        return React.cloneElement(child, stepProps);
                                    }   
                                    return child;
                                })
                            }
                        </ol>
                    )}
                </Stepper>
            </nav>
        );
    }
}
