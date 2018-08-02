import * as React from 'react';
import {Stepper} from './Stepper';
import Registry from '@ui-autotools/registry';

const stepperMetadata = Registry.getComponentMetadata(Stepper);
stepperMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      activeStep: 0,
      children: () => {return <div />;}
    }
  });