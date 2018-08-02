import {Popover} from './Popover';
import Registry from '@ui-autotools/registry';

const popoverMetadata = Registry.getComponentMetadata(Popover);
popoverMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      placement: 'auto',
      shown: true
    }
  });