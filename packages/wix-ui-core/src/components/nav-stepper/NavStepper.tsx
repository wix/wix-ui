import * as React from 'react';
import { style, classes } from './NavStepper.st.css';
import { Stepper } from '../stepper';
import { NavStep, ExternalNavStepProps } from './NavStep';

export { ExternalNavStepProps } from './NavStep';

export interface NavStepperProps {
  activeStep: number;
  onStepClick?(stepIndex: number, e: any): void;
}

export class NavStepper extends React.PureComponent<NavStepperProps> {
  public static Step: React.ComponentClass<
    ExternalNavStepProps
  > = NavStep as any;

  render() {
    const { activeStep, children } = this.props;

    return (
      <nav className={style(classes.root)}>
        <Stepper activeStep={activeStep}>
          {({ getStepProps }) => (
            <ol className={classes.steps}>
              {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                  const stepProps: any = getStepProps(index, {
                    ...child.props,
                    className: classes.step,
                  });

                  if (
                    this.props.onStepClick &&
                    !(stepProps.active || stepProps.disabled)
                  ) {
                    stepProps.onClick = (e: any) =>
                      this.props.onStepClick(index, e);
                  }
                  return React.cloneElement(child, stepProps);
                }
                return child;
              })}
            </ol>
          )}
        </Stepper>
      </nav>
    );
  }
}
