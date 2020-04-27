import { CircularProgressBar } from './CircularProgressBar';
import Registry from '@ui-autotools/registry';
import { st } from '../../../stories/CircularProgressBar/style.st.css';

const circularProgressBarMetadata = Registry.getComponentMetadata(
  CircularProgressBar,
);

circularProgressBarMetadata.exportInfo = {
  path: 'src/components/circular-progress-bar/CircularProgressBar',
  exportName: 'CircularProgressBar',
  baseStylePath:
    'src/components/circular-progress-bar/CircularProgressBar.st.css',
};

circularProgressBarMetadata.addStyle(st, {
  name: 'style',
  path: 'stories/CircularProgressBar/style.st.css',
});

circularProgressBarMetadata.addSim({
  title: 'Simulation with default props',
  props: {},
});
