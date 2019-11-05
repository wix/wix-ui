import { HorizontalMenu } from './HorizontalMenu';
import Registry from '@ui-autotools/registry';

const metadata = Registry.getComponentMetadata(HorizontalMenu);

metadata.addSim({
  title: 'Simulation with default props',
  props: {},
});
