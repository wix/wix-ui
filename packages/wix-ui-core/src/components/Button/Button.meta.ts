import {Button} from './Button';
import style from '../../../stories/Button/style.st.css';
import Registry from '@ui-autotools/registry';

const buttonMetadata = Registry.getComponentMetadata(Button);

buttonMetadata.exportedFrom({
  path: 'src/components/Button/Button',
  exportName: 'Button',
  baseStylePath: 'src/components/Button/Button.st.css'
});

buttonMetadata.addStyle(style, {name: 'style', path: 'stories/Button/style.st.css'});

buttonMetadata.addSim({
  title: 'Simulation with default props',
  props: {
    'aria-label': 'Click button',
    children: 'Button Sim'
  }
});