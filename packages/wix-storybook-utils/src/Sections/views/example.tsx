import * as React from 'react';

import { StoryConfig } from '../../typings/story-config';
import { ExampleSection, SectionType } from '../../typings/story-section';
import { sectionWithSiblings } from '../section-with-siblings';

import { code, description } from '..';
import { description as descriptionView } from './description';
import { code as codeView } from './code';

import { Layout, Cell } from '../../ui/Layout';

export const example = (
  section: ExampleSection,
  storyConfig: StoryConfig,
): React.ReactNode => (
  <Layout>
    <Cell span={4}>
      {console.log(section)}
      {sectionWithSiblings(
        description({
          ...section,
          type: SectionType.Description,
        }),
        descriptionView(section),
      )}
    </Cell>

    <Cell span={8}>
      {sectionWithSiblings(code(section), codeView(section))}
    </Cell>
  </Layout>
);
