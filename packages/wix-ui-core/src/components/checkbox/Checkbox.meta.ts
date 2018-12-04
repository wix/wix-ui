import {Checkbox} from './Checkbox';
import Registry from '@ui-autotools/registry';
import style from '../../../stories/Checkbox/style.st.css';

const checkboxMetadata = Registry.getComponentMetadata(Checkbox);

checkboxMetadata.exportedFrom({
  path: 'src/components/checkbox/Checkbox',
  exportName: 'Checkbox',
  baseStylePath: 'src/components/checkbox/Checkbox.st.css'
});

checkboxMetadata.addStyle(style, {name: 'style', path: 'stories/Checkbox/style.st.css'});

checkboxMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      'aria-label': 'Check to choose the option'
    }
  });
