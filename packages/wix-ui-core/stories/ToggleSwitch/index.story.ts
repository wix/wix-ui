import {ToggleSwitch} from '../../src/components/toggle-switch';
import style from './style.st.css';

export default {
  category: 'Components',
  storyName: 'ToggleSwitch',
  component: ToggleSwitch,
  componentPath: '../../src/components/toggle-switch',

  componentProps: (setState, getState) => ({
    ...style('root'),
    checked: false,
    disabled: false,
    onChange: () => setState({checked: !getState().checked}),
    'data-hook': 'story-toggleswitch'
  })
};
