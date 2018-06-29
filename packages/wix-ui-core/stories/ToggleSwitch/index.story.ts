import {ToggleSwitch} from '../../src/components/ToggleSwitch';
import style from './style.st.css';

export default {
  category: 'Components',
  storyName: 'ToggleSwitch',
  component: ToggleSwitch,
  componentPath: '../../src/components/ToggleSwitch',

  componentProps: (setState, getState) => ({
    ...style('root'),
    checked: false,
    disabled: false,
    onChange: () => setState({checked: !getState().checked}),
    'data-hook': 'story-toggleswitch'
  })
};
