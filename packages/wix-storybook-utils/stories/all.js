/* eslint-disable no-alert */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Markdown from '../src/Markdown';
import InteractiveCodeExample from '../src/InteractiveCodeExample';
import TabbedView from '../src/TabbedView';
import CodeExample from '../src/CodeExample';
import TextButton from '../src/TextButton';

import markdown from './examples/markdown.md';
import SomeComponentExample from './examples/Example';
import SomeComponentExampleRaw from '!raw-loader!./examples/Example';
import { AutoTestkit } from '../src/AutoTestkit/auto-testkit';

storiesOf('Components', module)
  .add('<CodeExample/>', () => (
    <div>
      Cool way to render components and see their code
      <CodeExample title={'some code example'} code={SomeComponentExampleRaw}>
        <SomeComponentExample />
      </CodeExample>
    </div>
  ))
  .add('<TabbedView/>', () => (
    <div>
      Display data in multiple tabs
      <TabbedView tabs={['A', 'B']}>
        <div>First Tab</div>
        <div>Second Tab</div>
      </TabbedView>
    </div>
  ))
  .add('<TextButton/>', () => (
    <div>
      a clickable textual button
      <TextButton onClick={() => alert('yes, it is clickable')}>
        This is a clickable button
      </TextButton>
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
  ));
