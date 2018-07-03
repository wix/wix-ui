import {NavStepper} from '../src/components/NavStepper';

export default {
  category: 'Components',
  storyName: 'NavStepper',

  component: NavStepper,
  componentPath: '../src/components/NavStepper/NavStepper.tsx',

  componentProps: {
    children: <NavStepper.Step>First Step</NavStepper.Step><NavStepper.Step>Second Step</NavStepper.Step>,
    activeStep: 0,
    'data-hook': 'storybook-navstepper'
  }
};
