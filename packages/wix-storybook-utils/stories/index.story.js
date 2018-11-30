import React from 'react';
import Component from './component';
import CodeShowcase from '../src/CodeShowcase';
import LiveCodeExample from '../src/LiveCodeExample';

const showcase = `<button className={button.one}>one</button>
<button className={button.two}>two</button>
<button className={button.three}>three</button>`;

const exampleScope = {
  Button: props => <button {...props} />
};

const ExampleShowcase = () => (
  <CodeShowcase title="CodeShowcase" code={showcase}>
    <button style={{ marginRight: '5px' }}>one</button>
    <button style={{ marginRight: '5px' }}>two</button>
    <button style={{ marginRight: '5px' }}>three</button>
  </CodeShowcase>
);

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
    },

    number: 4
  },

  exampleProps: {
    onClick: () => 'hai'
  },

  hiddenProps: ['propNotVisibleInStorybook'],

  examples: (
    <div>
      <ExampleShowcase />

      <LiveCodeExample
        scope={exampleScope}
        title="Live code example"
        initialCode={`
<div>
  <p>Look at me!</p>
  <Button>I come from the scope!</Button>
</div>
      `}
      />

      <div style={{ maxWidth: 440 }}>
        <LiveCodeExample
          compact
          title="Compact mode"
          scope={exampleScope}
          initialCode={`
<div>
  <p>Look at me!</p>
  <Button>I come from the scope!</Button>
</div>
          `}
        />
      </div>
    </div>
  )
};
