import * as React from 'react';
import {Slider} from '../src/components/Slider';

const SliderStory = ({children, ...rest}) => (
  <div style={{
    height: rest.orientation === 'vertical' ? 400 : 80,
    width: rest.orientation === 'vertical' ? 80 : '100%'
  }}>
    <Slider {...rest}/>
  </div>
);

export default {
  category: 'Components',
  name: 'Slider',
  storyName: 'Slider',
  component: SliderStory,
  componentPath: '../src/components/Slider',

  componentProps: setState => ({
    'data-hook': 'storybook-slider',
    value: 4,
    onChange: (value) => setState({value}),
  }),

  exampleProps: {
    onChange: () => 'Triggered onChange',
    onBlur: () => 'Triggered onBlur',
    onFocus: () => 'Triggered onFocus'
  }
};
