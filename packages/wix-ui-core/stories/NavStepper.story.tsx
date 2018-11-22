import * as React from 'react';
import {NavStepper} from '../src/components/nav-stepper/NavStepper'

export default {
  category: 'Components',
  storyName: 'NavStepper',

  component: NavStepper,
  componentPath: '../src/components/nav-stepper/NavStepper.tsx',

  componentProps: {
  children: [
      (<NavStepper.Step>Active</NavStepper.Step>),
      (<NavStepper.Step>Not visited</NavStepper.Step>),
      (<NavStepper.Step>Not visited</NavStepper.Step>),
      (<NavStepper.Step disabled>Disabled</NavStepper.Step>)
    ],
    activeStep: 0,
    'data-hook': 'storybook-navstepper'
  },
  exampleProps: {
      activeStep: [0,1,2,3]
  }
};