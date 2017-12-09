import createStory from '../create-story';

import ToggleSwitch from '../../src/components/ToggleSwitch';
import ToggleSwitchSource from '!raw-loader!../../src/components/ToggleSwitch';

export const story = () => createStory({
  category: 'Components',
  name: 'ToggleSwitch',
  storyName: 'ToggleSwitch',
  component: ToggleSwitch,
  componentProps: (setState, getState) => ({
    checked: false,
    onChange: () => setState({checked: !getState().checked})
  }),
  source: ToggleSwitchSource
});
