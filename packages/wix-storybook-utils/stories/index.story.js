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

      <LiveCodeExample
        title="With non-inline code"
        scope={exampleScope}
        autoRender={false}
        initialCode={`
const ComponentWithStyles = (props) => (
  <div
    style={{ background: 'tomato', color: 'white', padding: 5 }}
    {...props}
    />
);

class ComponentWithState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ count }) => ({ count: count + 1 }));
  }

  render() {
    const { count } = this.state;

    return (
      <div onClick={this.handleClick}>You clicked this {count} times!</div>
    );
  }
}

// When using autoRender={false}, we need to call the \`render\` function
render(
  <ComponentWithStyles>
    <ComponentWithState />
  </ComponentWithStyles>
);
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
