import {Checkbox} from './Checkbox';
import Registry from '@ui-autotools/registry';

const checkboxMetadata = Registry.getComponentMetadata(Checkbox);
checkboxMetadata
  .addSim({
    title: 'checkboxSim',
    props: {}
  });
