import React from 'react';
import {
  header,
  tabs,
  tab,
  example as baseExample,
  title,
  divider,
  description,
  importExample,
} from '../../src/Sections';
import { StorybookComponents } from '../../src/StorybookComponents';
import Component from '../Component';

const example = (config) =>
  baseExample({ ...config, components: { StorybookComponents } });

export default {
  category: 'StorybookComponents',
  storyName: 'Component',
  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl: 'https://github.com/wix/wix-style-react/tree/master/src/Input',
    }),
    tabs([
      tab({
        title: 'Description',
        sections: [
          description({
            title: 'Description',
            text:
              'This is a story about Design Systems dedicated componetns for stories.',
          }),

          importExample(
            'import { StorybookComponents } from "wix-storybook-utils"'
          ),

          divider(),

          title('StorybookComponent.Placeholder'),

          example({
            title: 'Skin',
            source: `<div style={{ display: 'flex', gap: '30px' }}>
            <StorybookComponents.Placeholder skin="light">White skin</StorybookComponents.Placeholder>
            <StorybookComponents.Placeholder>Dark skin</StorybookComponents.Placeholder>
            </div>`,
          }),

          example({
            title: 'Width & Height',
            source: `<StorybookComponents.Placeholder width="100px" height="100px">Small Box</StorybookComponents.Placeholder>`,
          }),

          title('StorybookComponent.Stack'),

          example({
            title: 'Gap',
            source: `
            <StorybookComponents.Stack gap="30px">
            <StorybookComponents.Placeholder width="100px">Block 1</StorybookComponents.Placeholder>
            <StorybookComponents.Placeholder width="100px">Block 2</StorybookComponents.Placeholder>
            </StorybookComponents.Stack>`,
          }),

          example({
            title: 'Row',
            source: `
              <StorybookComponents.Stack>
                <StorybookComponents.Placeholder width="100px">Block 1</StorybookComponents.Placeholder>
                <StorybookComponents.Placeholder width="100px">Block 2</StorybookComponents.Placeholder>
              </StorybookComponents.Stack>
            `,
          }),

          example({
            title: 'Column',
            source: `
              <StorybookComponents.Stack flexDirection="column">
                <StorybookComponents.Placeholder width="100px">Block 1</StorybookComponents.Placeholder>
                <StorybookComponents.Placeholder width="100px">Block 2</StorybookComponents.Placeholder>
              </StorybookComponents.Stack>
          `,
          }),

          title('StorybookComponent.Background'),

          example({
            title: 'Dark background',
            source: `
              <StorybookComponents.Stack >
                <StorybookComponents.Background skin="dark">Block 1</StorybookComponents.Background>
              </StorybookComponents.Stack>
          `,
          }),
        ],
      }),
    ]),
  ],
};
