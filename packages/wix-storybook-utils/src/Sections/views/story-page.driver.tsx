import { storyPage } from './story-page';
import { SectionType } from '../../typings/story-section';
import React from 'react';

const _structure = `<div style={{ height: '100px' }}><div/><div/><div/></div>`;

export const createStoryBuilder = (content?: any, config?: any) => {
  const defaultContent = {
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
    examples: { _structure },
    demo: <div />,
  };

  const defaultConfig = {
    config: {
      repoBaseURL: '',
    },
    story: defaultContent,
    exampleImport: 'import',
    storyName: 'Story',
  };

  const outputContent = content || defaultContent;
  const outputConfig = config || defaultConfig;

  return {
    input: JSON.stringify(storyPage(buildInput(outputContent), outputConfig)),
    output: JSON.stringify(buildOutput(outputContent, outputConfig)),
    addExamples: (examples: any) => {
      if (!content) {
        defaultContent.examples = { ...examples, _structure };
        return createStoryBuilder(defaultContent);
      }
      content.examples = { ...examples, _structure };
      console.log(content);
      return createStoryBuilder(content);
    },
    addFeatureExample: (example: any) => {
      if (!content) {
        defaultContent.featureExamples = [example];
        return createStoryBuilder(defaultContent);
      }
      content.featureExamples.push(example);
      return createStoryBuilder(content);
    },
    addCommonUseCasesExample: (example: any) => {
      if (!content) {
        defaultContent.commonUseCaseExamples = [example];
        return createStoryBuilder(defaultContent);
      }
      content.commonUseCaseExamples.push(example);
      return createStoryBuilder(content);
    },
    addDescription: (description: string) => {
      if (!content) {
        defaultContent.description = description;
        return createStoryBuilder(defaultContent);
      }

      content.description = description;
      return createStoryBuilder(content);
    },

    addDoDont: (doDont: { do: string[]; dont: string[] }) => {
      if (!content) {
        defaultContent.do = doDont.do;
        defaultContent.dont = doDont.dont;
        return createStoryBuilder(defaultContent);
      }
      content.do = doDont.do;
      content.dont = doDont.dont;
      return createStoryBuilder(content);
    },

    addDemo: (demo: React.ReactElement) => {
      if (!content) {
        defaultContent.demo = demo;
        return createStoryBuilder(defaultContent);
      }
      content.demo = demo;
      return createStoryBuilder(content);
    },
  };
};

const buildInput = (content: any) => ({
  type: SectionType.StoryPage,
  content: {
    description: content.description,
    do: content.do,
    dont: content.dont,
    featureExamples: content.featureExamples,
    commonUseCaseExamples: content.commonUseCaseExamples,
  },
  examples: content.examples,
  demo: content.demo,
});

const buildOutput = (content: any, config: any) => {
  const featureExamples = content.featureExamples
    .map((example, index) => ({
      type: 'example',
      key: index,
      title: example.title,
      text: example.description,
      source: content.examples[example.example],
      compact: true,
    }))
    .filter(example => example.source);

  const commonUseCaseExamples = content.commonUseCaseExamples
    .map((example, index) => ({
      type: 'example',
      key: index,
      title: example.title,
      text: example.description,
      source: content.examples[example.example],
      compact: true,
    }))
    .filter(example => example.source);

  const doDontModule = () => {
    if (!content.do.length && !content.dont.length) {
      return null;
    }

    return {
      type: 'doDont',
      do: { list: content.do },
      dont: { list: content.dont },
    };
  };
  const demoModule = () => {
    if (!content.demo) {
      return null;
    }

    return {
      title: 'Demo',
      type: 'demo',
      component: content.demo,
    };
  };
  return [
    { type: 'header', sourceUrl: '/Story' },
    {
      type: 'tabs',
      tabs: [
        {
          title: 'Design',
          type: 'tab',
          sections: [
            demoModule(),
            {
              type: 'description',
              text: content.description || 'This is description',
              title: 'Usage',
            },
            doDontModule(),
            { title: 'Import', type: 'importExample', source: 'import' },
            { type: 'divider' },
            { type: 'title', title: 'Variations' },
            ...featureExamples,
            { type: 'title', title: 'Common Use Cases' },
            ...commonUseCaseExamples,
            { type: 'divider' },
            { type: 'title', title: 'Feedback' },
            { type: 'description' },
          ].filter(item => !!item),
        },
        { title: 'API', type: 'tab', sections: [{ type: 'api' }] },
        { title: 'Testkit', type: 'tab', sections: [{ type: 'testkit' }] },
      ],
    },
  ];
};
