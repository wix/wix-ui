import {Popover} from './Popover';
import Registry from '@ui-autotools/registry';

const popoverMetadata = Registry.getComponentMetadata(Popover);
popoverMetadata
  .addSim({
    title: 'popoverSim',
    props: {
      placement: 'auto',
      shown: true
    }
  });