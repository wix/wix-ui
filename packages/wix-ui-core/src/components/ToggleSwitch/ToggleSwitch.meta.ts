import {ToggleSwitch} from './ToggleSwitch';
import Registry from '@ui-autotools/registry';
import style from '../../../stories/ToggleSwitch/style.st.css';

const toggleSwitchMetadata = Registry.getComponentMetadata(ToggleSwitch);

toggleSwitchMetadata.exportedFrom({
  path: 'src/components/ToggleSwitch/ToggleSwitch',
  exportName: 'ToggleSwitch',
  baseStylePath: 'src/components/ToggleSwitch/ToggleSwitch.st.css'
});

toggleSwitchMetadata.addStyle(style, {name: 'style', path: 'stories/ToggleSwitch/style.st.css'});

toggleSwitchMetadata
.addSim({
    title: 'Simulation with default props',
    props: {
      'aria-label': 'ToggleSwitch'
    }
  });