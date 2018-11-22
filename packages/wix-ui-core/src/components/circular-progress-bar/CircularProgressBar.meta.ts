import {CircularProgressBar} from './CircularProgressBar';
import Registry from '@ui-autotools/registry';
import style from '../../../stories/CircularProgressBar/style.st.css';


const circularProgressBarMetadata = Registry.getComponentMetadata(CircularProgressBar);

circularProgressBarMetadata.exportedFrom({
  path: 'src/components/CircularProgressBar/CircularProgressBar',
  exportName: 'CircularProgressBar',
  baseStylePath: 'src/components/CircularProgressBar/CircularProgressBar.st.css'
});

circularProgressBarMetadata.addStyle(style, {name: 'style', path: 'stories/CircularProgressBar/style.st.css'});

circularProgressBarMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {}
  });