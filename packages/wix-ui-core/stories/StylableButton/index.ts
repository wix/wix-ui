import 'react';
import createStory from '../create-story';

import {StylableButton} from '../../src/components/StylableButton';
import * as StylableButtonSource from '!raw-loader!../../src/components/StylableButton/index.tsx';
import commonStyle from '../../src/components/StylableButton/StylableButtonStyle.st.css';

export const story = () => createStory({
  category: 'Components',
  name: 'StylableButton',
  storyName: 'StylableButton',
  component: StylableButton,
  componentProps: () => ({
    ...commonStyle('root'),
    disabled: false,
    type: 'button',
    children: 'I\'m a Stylable Button!',
    dataHook: 'storybook-StylableButton'
  }),
  exampleProps: {
    onClick: () => 'Clicked!',
    onMouseEnter: () => 'Mouse Enter!',
    onMouseLeave: () => 'Mouse Leave!',
  },
  source: StylableButtonSource
});
