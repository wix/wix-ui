import { render } from '@testing-library/react';
import { storyPage } from './story-page';

import React from 'react';

const _structure = `<div style={{ height: '100px' }}><div/><div/><div/></div>`;
const demoExample = () => <div>Hello hello</div>;
const storyProps = {
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
  component: {},
  story: storyProps,
} as any;

describe('StoryPage', () => {
  it('should render storyPage', () => {
    const props = storyProps as any;
    const { container, debug } = render(storyPage(props, defaultStoryConfig));
    debug();

    expect(container.querySelector('[data-hook="story-page"]')).toBe(true);
  });
});
