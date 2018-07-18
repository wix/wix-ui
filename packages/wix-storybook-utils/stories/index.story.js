import React from 'react';
import Component from './component';

export default {
  category: 'Components',
  storyName: 'Dummy Component',

  component: Component,
  componentPath: './component.js',

  componentProps: {
    // test should be visible even though it's not part of component propTypes
    test: 'im a test',

    enabled: true,
    bigFunction(argument1, argument2, ...rest) {
      const text = `${argument1} with ${argument2} are good friends`;

      return rest.map(n => {
        const upper = n.toUpperCase();
        return upper.repeat(5) + text;
      });
    }
  },

  exampleProps: {
    onClick: () => 'hai'
  },

  hiddenProps: ['propNotVisibleInStorybook'],

  examples: (
    <div>This is my examples free content space </div>
  )
};
