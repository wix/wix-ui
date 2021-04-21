import { storyPage } from './story-page';

import { SectionType } from '../../typings/story-section';

const _structure = `<div style={{ height: '100px' }}><div/><div/><div/></div>`;

const createStoryBuilder = (
  storyProps?: any,
  storyConfig?: any,
  output?: any,
) => {
  const defaultStoryProps = {
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
    storyName: 'Story',
    component: () => ({}),
    story: storyProps,
    exampleImport: 'import',
  } as any;

  const defaultOutput = [
    { type: 'header', sourceUrl: '/Story' },
    {
      type: 'tabs',
      tabs: [
        {
          title: 'Design',
          type: 'tab',
          sections: [
            {
              type: 'description',
              text: 'This is description',
              title: 'Usage',
            },
            {
              type: 'doDont',
              do: { list: ['this', 'that'] },
              dont: { list: ['one', 'two'] },
            },
            { title: 'Import', type: 'importExample', source: 'import' },
            { type: 'divider' },
            { type: 'title', title: 'Variations' },
            {
              type: 'example',
              key: 0,
              title: 'Structure',
              text:
                'Radio button consists of a radio itself and a label on the side.',
              source:
                "<div style={{ height: '100px' }}><div/><div/><div/></div>",
              compact: true,
            },
            { type: 'title', title: 'Common Use Cases' },
            { type: 'divider' },
            { type: 'title', title: 'Feedback' },
            { type: 'description' },
          ],
        },
        { title: 'API', type: 'tab', sections: [{ type: 'api' }] },
        { title: 'Testkit', type: 'tab', sections: [{ type: 'testkit' }] },
      ],
    },
  ];
  const props = storyProps || defaultStoryProps;
  const config = storyConfig || defaultStoryConfig;
  let result = output || defaultOutput;
  return {
    input: JSON.stringify(storyPage(props, config)),
    output: JSON.stringify(result),
    addFeatureExample: (example: any) => {
      storyProps = storyProps.content.featureExamples = [example] as any;

      const modifiedTabs = result[1].tabs.map(tab => {
        if (tab.title === 'Design') {
          return tab.sections.findIndex(section => section.type);
        }

        return tab;
      });
      result = [result[0], modifiedTabs];
      return createStoryBuilder(storyProps, defaultStoryConfig, result);
    },
  };
};

//addContent, addDoDont, addFeatureExamples, addCommonUseCasesExamples,  addDemo, addTabConfig

describe('StoryPage', () => {
  // it('should render simple storyPage', () => {
  //   const { input, output } = createStoryBuilder();

  //   expect(input).toBe(output);
  // });

  // it('should render story page with given feature example', () => {
  //   const featureExample = {
  //     title: 'title',
  //     description: 'description',
  //     example: '<div/>',
  //     layout: 'lanscape',
  //   };

  //   const { input, output } = createStoryBuilder().addFeatureExample(
  //     featureExample,
  //   );

  //   expect(input).toBe(output);
  // });
});
