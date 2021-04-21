import { storyPage } from './story-page';

import React from 'react';
import { SectionType } from '../../typings/story-section';

const _structure = `<div style={{ height: '100px' }}><div/><div/><div/></div>`;
const demoExample = () => <div>Hello hello</div>;

const storyProps = {
  type: SectionType.StoryPage,
  content: {
    description: 'This is description',
    do: ['this', 'that'],
    dont: ['one', 'two'],
    featureExamples: [
      {
        title: 'Structure',
        description:
          'Radio button consists of a radio itself and a label on the side.',
        example: '_structure',
      },
    ],
    commonUseCaseExamples: [],
  },
  examples: { _structure },
  demo: demoExample,
};

const defaultStoryConfig = {
  metadata: {
    displayName: 'test',
    props: {},
  },
  config: {
    importFormat: '',
    moduleName: '',
    repoBaseURL: '',
  },
  component: () => ({}),
  story: storyProps,
} as any;

describe('StoryPage', () => {
  it('should render storyPage', () => {
    const props = {
      type: SectionType.StoryPage,
      content: {
        description: 'This is description',
        do: ['this', 'that'],
        dont: ['one', 'two'],
      },
      examples: { _structure },
      demo: demoExample,
    };
    expect(storyPage(props as any, defaultStoryConfig)).toBe(true);
  });
});
