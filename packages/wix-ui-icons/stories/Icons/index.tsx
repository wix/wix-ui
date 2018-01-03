import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from 'wix-storybook-utils/Markdown';
import CodeExample from 'wix-storybook-utils/CodeExample';

import Readme from '../../src/Icons/README.md';

import AllIcons from './AllIcons';
import AllIconsRaw from '!raw-loader!./AllIcons';

import CustomeIcon from './CustomIcon';
import CustomeIconRaw from '!raw-loader!./CustomIcon';

import RTLIcon from './RTLIcon';
import RTLIconRaw from '!raw-loader!./RTLIcon';

storiesOf('Common', module)
  .add('Icons', () => (
    <div>
      <Markdown source={Readme}/>

      <CodeExample title="All Icons" code={AllIconsRaw}>
        <AllIcons/>
      </CodeExample>
      <CodeExample title="Custom Icon" code={CustomeIconRaw}>
        <CustomeIcon/>
      </CodeExample>
      <CodeExample title="RTL Icon" code={RTLIconRaw}>
        <RTLIcon/>
      </CodeExample>
    </div>
  ));
