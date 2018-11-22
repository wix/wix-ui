import {Button} from './Button';
import style from './ButtonStyle.st.css';
import Registry from '@ui-autotools/registry';

const buttonMetadata = Registry.getComponentMetadata(Button);

buttonMetadata.exportedFrom({
  path: 'src/components/deprecated/Button/Button',
  exportName: 'Button',
  baseStylePath: 'src/components/deprecated/Button/Button.st.css'
});

buttonMetadata.addStyle(style, {name: 'style', path: 'src/components/deprecated/Button/ButtonStyle.st.css'});

buttonMetadata.addSim({
  title: 'Simulation with default props',
  props: {
    'aria-label': 'Click button',
    children: 'Button Sim'
  }
});