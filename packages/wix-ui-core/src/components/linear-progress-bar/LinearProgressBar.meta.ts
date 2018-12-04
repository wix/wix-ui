import {LinearProgressBar} from './LinearProgressBar';
import Registry from '@ui-autotools/registry';
import style from '../../../stories/LinearProgressBar/style.st.css';

const linearProgressBarMetadata = Registry.getComponentMetadata(LinearProgressBar);

linearProgressBarMetadata.exportedFrom({
  path: 'src/components/linear-progress-bar/LinearProgressBar',
  exportName: 'LinearProgressBar',
  baseStylePath: 'src/components/linear-progress-bar/LinearProgressBar.st.css'
});

linearProgressBarMetadata.addStyle(style, {name: 'style', path: 'stories/LinearProgressBar/style.st.css'});

linearProgressBarMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {}
  });