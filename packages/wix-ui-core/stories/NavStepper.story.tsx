import * as React from 'react';
import {NavStepper} from '../src/components/NavStepper/NavStepper'

export default {
  category: 'Components',
  storyName: 'NavStepper',

  component: NavStepper,
  componentPath: '../src/components/NavStepper/NavStepper.tsx',

  componentProps: {
  children: <React.Fragment><NavStepper.Step>First Step</NavStepper.Step><NavStepper.Step>Second Step</NavStepper.Step></React.Fragment>,
    activeStep: 0,
    'data-hook': 'storybook-navstepper'
  }
};