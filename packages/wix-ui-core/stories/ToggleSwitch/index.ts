import {ToggleSwitch} from '../../src/components/ToggleSwitch';
import style from './style.st.css';

export default {
  category: 'Components',
  storyName: 'StylableToggleSwitchStory',
  component: ToggleSwitch,
  componentPath: '../../src/components/StylableToggleSwitch',

  componentProps: (setState, getState) => ({
    ...style('root'),
    checked: false,
    onChange: () => setState({checked: !getState().checked}),
    'data-hook': 'story-StylableToggleSwitch'
  })
};
