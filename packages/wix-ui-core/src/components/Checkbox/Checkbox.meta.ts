import {Checkbox} from './Checkbox';
import Registry from '@ui-autotools/registry';

const myMeta = Registry.getComponentMetadata(Checkbox);
myMeta.addSim({title: 'Checkme out', props: {}});
