/* eslint-disable no-alert */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Markdown from '../../src/Markdown';
import InteractiveCodeExample from '../../src/InteractiveCodeExample';
import CodeExample from '../../src/CodeExample';
import NewPlayground from '../../src/NewPlayground/NewPlayground';
import Input from '../../src/ui/input';
import SearchInput from '../../src/ui/search-input';
import Button from '../../src/ui/button';

import markdown from './examples/markdown.md';
import SomeComponentExample from './examples/Example';
import SomeComponentExampleRaw from '!raw-loader!./examples/Example';

storiesOf('Components', module)
  .add('<NewPlayground/>', () => {
    const initialCode = `() => {
  React.useEffect(() => {
    console.log('hello');
  }, [])

  return <div>hey</div>;
}`;
    return (
      <NewPlayground initialCode={initialCode} />
    );
  })

  .add('<CodeExample/>', () => (
    <div>
      Cool way to render components and see their code
      <CodeExample title={'some code example'} code={SomeComponentExampleRaw}>
        <SomeComponentExample />
      </CodeExample>
    </div>
  ))

  .add('<Markdown/>', () => (
    <div>
      A great way to display Markdown files
      <Markdown source={markdown} />
    </div>
  ))

  .add('<InteractiveCodeExample/> ', () => (
    <div>
      This component should display a component with some code above it
      <br />
      It is relatively old and should be removed sometime
      <InteractiveCodeExample title="Customize some section">
        <SomeComponentExample />
      </InteractiveCodeExample>
    </div>
  ))

  .add('<Input/>', () => (
    <div>
      This component allows to add text input to a story
      <Input />
    </div>
  ))

  .add('<SearchInput/>', () => (
    <div>
      This component allows to add search to a story
      <SearchInput />
    </div>
  ))

  .add('<Button/>', () => (
    <div style={{ display: 'grid', gridAutoRows: 'auto', gap: '10px' }}>
      <div>
        <Button>Regular</Button>
      </div>
      <div>
        <Button disabled>Disabled</Button>
      </div>
      <div>
        <Button size="tiny">Tiny</Button>
      </div>
      <div>
        <Button size="small">Small</Button>
      </div>
      <div>
        <Button size="large">Large</Button>
      </div>
      <div>
        <Button fullWidth>Full Width</Button>
      </div>
    </div>
  ));
