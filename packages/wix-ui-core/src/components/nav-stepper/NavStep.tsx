import * as React from 'react';
import { style, classes } from './NavStep.st.css';
import { StepProps } from '../stepper';

export type ExternalNavStepProps = Partial<StepProps> & {
  disabled?: boolean;
  children: React.ReactNode;
};
export type NavStepProps = StepProps & ExternalNavStepProps;

export class NavStep extends React.PureComponent<NavStepProps> {
  render() {
    const { active, disabled, visited, children, ...rest } = this.props;
    const ariaProps: any = {};
    active && (ariaProps['aria-current'] = 'page');

    return (
      <li
        {...ariaProps}
        {...rest}
        className={style(classes.root, { active, visited, disabled })}
      >
        {children}
      </li>
    );
  }
}
