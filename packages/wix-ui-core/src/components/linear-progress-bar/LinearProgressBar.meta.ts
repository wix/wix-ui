import { LinearProgressBar } from './LinearProgressBar';
import Registry from '@ui-autotools/registry';
import { st } from '../../../stories/LinearProgressBar/style.st.css';

const linearProgressBarMetadata = Registry.getComponentMetadata(
  LinearProgressBar,
);

linearProgressBarMetadata.exportInfo = {
  path: 'src/components/linear-progress-bar/LinearProgressBar',
  exportName: 'LinearProgressBar',
  baseStylePath: 'src/components/linear-progress-bar/LinearProgressBar.st.css',
};

linearProgressBarMetadata.addStyle(st, {
  name: 'style',
  path: 'stories/LinearProgressBar/style.st.css',
});

linearProgressBarMetadata.addSim({
  title: 'Simulation with default props',
  props: {},
});
