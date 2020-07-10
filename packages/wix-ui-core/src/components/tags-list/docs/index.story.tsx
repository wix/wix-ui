import * as React from 'react';

import {Tag, TagsList} from '..';
import { DisplayNames } from '../TagsList.helpers';
import {SingleSelectionExample} from './SingleSelectionExample';
import {SimpleExample} from './SimpleExample';
import {
  header,
  description,
  title,
  tabs,
  tab,
  divider,
  code,
  testkit,
  importExample,
  playground,
  columns,
} from 'wix-storybook-utils/Sections';
import {
  Category,
  baseScope as allComponents,
} from '../../../../stories/utils';
import compoundReadmeApi from './CompoundComponentsAPI.md';

const liveCode = config =>
  code({
    compact: true,
    components: allComponents,
    ...config,
  });

const TagsListExample = () => (
  <TagsList>
    <Tag label="first-tag" value="example">
      First tag
    </Tag>
    <Tag label="second-tag" value="another example">
      Second tag
    </Tag>
    <Tag label="third-tag" value="one more example">
      Third tag
    </Tag>
  </TagsList>
);

export default {
  category: Category.COMPONENTS,
  storyName: DisplayNames.TagsList,
  component: TagsList,
  componentPath: '..',
  componentProps: {
    children: TagsListExample(),
  },
  sections: [
    header({
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/Sidebar/',
    }),
    tabs([
      tab({
        title: 'Usage',
        sections: [
          description({
            title: 'Description',
            text:
              'TagsList is a list of tags, which are, bascically, simple labels with checkboxes inside',
          }),
          importExample(`import {TagsList, Tag} from 'wix-ui-core/tags-list';`),
          divider(),
          title('Examples'),
          columns([
            description({
              title: 'Basic example',
              text: '`TagsList` will render passed items - Tags.',
            }),
            liveCode({
              source: SimpleExample(),
            }),
          ]),
          columns([
            description({
              title: 'Single Selection example',
            }),
            liveCode({
              source: SingleSelectionExample(),
            }),
          ]),
        ],
      }),
      tab({
        title: 'Compound components API',
        sections: [description(compoundReadmeApi)],
      }),
      tab({ title: 'Testkit', sections: [testkit()] }),
      tab({ title: 'Playground', sections: [playground()] }),
    ]),
  ],
};
