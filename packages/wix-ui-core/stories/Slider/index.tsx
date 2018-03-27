import * as React from 'react';
import createStory from '../create-story';
import {Slider} from '../../src/components/Slider';
import * as source from '!raw-loader!../../src/components/Slider/Slider.tsx';

export const story = () => createStory({
  category: 'Components',
  name: 'Slider',
  storyName: 'Slider',
  component: SliderStory,
  source,
  componentProps: setState => ({
    'data-hook': 'storybook-slider',
    value: 4,
    onChange: (value) => setState({value}),
  }),

  exampleProps: {
    onChange: () => 'Triggered onChange',
    onBlur: () => 'Triggered onBlur',
    onFocus: () => 'Triggered onFocus'
  },
});

const SliderStory = ({children, ...rest}) => (
  <div style={{height: rest.orientation === 'vertical' ? 400 : 80, width: rest.orientation === 'vertical' ? 80 : '100%'}}>
    <Slider {...rest}/>
  </div>
);
