import * as React from 'react';
import style from './NavStepper.st.css';
import {Stepper} from '../../baseComponents/Stepper';
import {NavStep, ExternalNavStepProps} from './NavStep';
import {isReactElement} from '../../utils';
import {childrenOfType, nonNegativeInteger} from 'airbnb-prop-types';
import {arrayOf} from 'prop-types';

export interface NavStepperProps {
    activeStep: number;
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
                        <ol className={style.stepsList}>
                            {
                                React.Children.map(children, (child, index) => {
                                    if (React.isValidElement(child)) {
                                        return React.cloneElement(child, getStepProps(index, {...child.props, className: style.step}));
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
