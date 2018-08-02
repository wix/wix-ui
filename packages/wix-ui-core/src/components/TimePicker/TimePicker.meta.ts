import {TimePicker} from './TimePicker';
import Registry from '@ui-autotools/registry';

const timePickerMetadata = Registry.getComponentMetadata(TimePicker);
timePickerMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {}
  });