import * as React from 'react';
import {Slider} from '../src/components/slider';

const SliderStory = ({children, ...rest}) => {
  const height = rest.orientation === 'vertical' ? 400 : 80;
  const width = rest.orientation === 'vertical' ? 80 : 400;

  return (
    <div style={{height, width}}>
      <Slider {...rest} style={{width, height}}/>
    </div>
  );
};

export default {
  category: 'Components',
  name: 'Slider',
  storyName: 'Slider',
  component: SliderStory,
  componentPath: '../src/components/slider',

  componentProps: setState => ({
    'data-hook': 'storybook-slider',
    value: 4,
    onChange: value => setState({value}),
  }),

  exampleProps: {
    onChange: () => 'Triggered onChange',
    onBlur: () => 'Triggered onBlur',
    onFocus: () => 'Triggered onFocus'
  }
};
