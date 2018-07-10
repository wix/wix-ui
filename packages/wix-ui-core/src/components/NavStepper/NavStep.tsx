import * as React from 'react';
import style from './NavStep.st.css';
import {StepProps} from '../../baseComponents/Stepper';
import {bool, Requireable} from 'prop-types';

export type ExternalNavStepProps = Partial<StepProps> & {
    disabled?: boolean;
    children: React.ReactNode;
}
export type NavStepProps = StepProps & ExternalNavStepProps;

export class NavStep extends React.PureComponent<NavStepProps> {
    static propTypes = {
        disabled: bool
    }
    render () {
        const {active, disabled, visited, children, ...rest} = this.props;
        const ariaProps: any = {}
        active && (ariaProps['aria-current'] = 'page');

        return (
            <li {...ariaProps} {...rest} {...style('root', {active, visited, disabled}, this.props)}>
                {children}
            </li>
        );
    }
}
