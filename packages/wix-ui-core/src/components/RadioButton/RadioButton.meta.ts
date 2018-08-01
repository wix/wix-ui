import {RadioButton} from './RadioButton';
import Registry from '@ui-autotools/registry';

const radioButtonMetadata = Registry.getComponentMetadata(RadioButton);
radioButtonMetadata.addSim({
  title: 'radioButtonSim',
  props: {}
});