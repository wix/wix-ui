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
): React.ReactNode => {
  const { wide } = section;
  return (
    <Layout gap={wide ? '0px' : '30px'} key={section.key}>
      <Cell span={wide ? 8 : 4}>
        {sectionWithSiblings(
          description({
            ...section,
            type: SectionType.Description,
          }),
          descriptionView({ ...section, size: wide ? 'small' : 'normal' }),
          true,
        )}
      </Cell>

      <Cell span={wide ? 12 : 8}>
        {sectionWithSiblings(code(section), codeView(section, storyConfig))}
      </Cell>
    </Layout>
  );
};
