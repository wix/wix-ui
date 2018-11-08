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
  .add('<ggggg/>', () => (
    <div>
      A great way to display Markdown files
      <AutoTestkit
        component={{
          props: {
            thing: {
              type: {
                name: 'enum',
                value: [
                  {
                    value: "'first'",
                    computed: false
                  },
                  {
                    value: "'second'",
                    computed: false
                  }
                ]
              },
              required: false,
              description: ''
            },
            children: {
              type: {
                name: 'node'
              },
              required: true,
              description: 'i am description about `children` prop'
            }
          },
          description: '',
          displayName: 'Component',
          methods: [],
          readme: 'source of `./readme.md` if exists, otherwise empty string',
          readmeAccessibility:
            'source of `./readme.accessibility.md` if exists, otherwise empty string',
          readmeTestkit:
            'source of `./readme.testkit.md` if exists, otherwise empty string',
          drivers: [
            // metadata of exported methods in *.driver.js, *.protractor.driver.js or *.pupeteer.driver.js
            {
              file: 'component.driver.js',
              descriptor: [
                {
                  name: 'click',
                  args: [{ name: 'buzz' }, { name: 'fizz' }],
                  type: 'function',
                  description: 'foobar'
                }
              ]
            },
            {
              file: 'component.pupeteer.driver.js',
              descriptor: [
                {
                  name: 'element',
                  args: [
                    { name: 'fizz', type: 'string' },
                    { name: 'buzz', type: 'number' }
                  ],
                  type: 'function',
                  description: 'fizzbuzz',
                }
              ]
            },
            {
              file: 'component.cypres.js',
              descriptor: [],
            },
          ]
        }}
      />
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
