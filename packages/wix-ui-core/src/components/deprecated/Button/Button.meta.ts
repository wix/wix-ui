import {Button} from './Button';
import Registry from '@ui-autotools/registry';

const buttonMetadata = Registry.getComponentMetadata(Button);
buttonMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      'aria-label': 'Click button'
    }
  });