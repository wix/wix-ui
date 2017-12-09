import story from '../create-story';

import ToggleSwitch from '../../src/components/ToggleSwitch';
import ToggleSwitchSource from '!raw-loader!../../src/components/ToggleSwitch';

story({
  category: 'Components',
  name: 'ToggleSwitch',
  storyName: 'ToggleSwitch',
  component: ToggleSwitch,
  source: ToggleSwitchSource
});
