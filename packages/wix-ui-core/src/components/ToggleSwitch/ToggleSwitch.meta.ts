import {ToggleSwitch} from './ToggleSwitch';
import Registry from '@ui-autotools/registry';

const toggleSwitchMetadata = Registry.getComponentMetadata(ToggleSwitch);
toggleSwitchMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {}
  });