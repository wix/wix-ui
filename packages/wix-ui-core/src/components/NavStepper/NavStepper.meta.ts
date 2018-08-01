import {NavStepper} from './NavStepper';
import Registry from '@ui-autotools/registry';

const navStepperMetadata = Registry.getComponentMetadata(NavStepper);
navStepperMetadata
  .addSim({
    title: 'navStepperSim',
    props: {
      activeStep: 0
    }
  });