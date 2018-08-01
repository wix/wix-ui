import {Button} from './Button';
import Registry from '@ui-autotools/registry';

const buttonMetadata = Registry.getComponentMetadata(Button);
buttonMetadata
  .addSim({
    title: 'buttonSim',
    props: {}
  });