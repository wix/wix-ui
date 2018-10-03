import {Checkbox} from './Checkbox';
import Registry from '@ui-autotools/registry';
import style from './CheckboxStyle.st.css';

const checkboxMetadata = Registry.getComponentMetadata(Checkbox);

checkboxMetadata.exportedFrom({
  path: 'src/components/Checkbox/Checkbox',
  exportName: 'ButtonNext',
  baseStylePath: 'src/components/Checkbox/Checkbox.st.css'
});

checkboxMetadata.addStyle(style, {name: 'style', path: 'src/components/Checkbox/CheckboxStyle.st.css'});

checkboxMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      'aria-label': 'Check to choose the option'
    }
  });
