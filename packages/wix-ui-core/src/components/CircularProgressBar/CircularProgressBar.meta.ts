import {CircularProgressBar} from './CircularProgressBar';
import Registry from '@ui-autotools/registry';

const circularProgressBarMetadata = Registry.getComponentMetadata(CircularProgressBar);
circularProgressBarMetadata
  .addSim({
    title: 'circularProgressBarSim',
    props: {}
  });