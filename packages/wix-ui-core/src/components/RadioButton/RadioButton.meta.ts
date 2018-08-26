import {RadioButton} from './RadioButton';
import Registry from '@ui-autotools/registry';

const radioButtonMetadata = Registry.getComponentMetadata(RadioButton);
radioButtonMetadata.addSim({
  title: 'Simulation with default props',
  props: {
    'aria-label': 'Click to choose an option'
  }
});