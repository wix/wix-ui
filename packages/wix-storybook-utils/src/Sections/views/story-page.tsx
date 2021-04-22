import * as React from 'react';

import {
  SectionType,
  StoryPageSection,
  TabSection,
} from '../../typings/story-section';
import { StoryConfig } from '../../typings/story-config';
import { Example, Tabs } from '../../typings/story';

const examples = (props: { examples: Example[]; storyConfig: StoryConfig }) => {
  if (!props.examples || !props.examples.length) {
    return [];
  }

  return props.examples.map((item, index) => ({
    type: SectionType.Example,
    key: index,
    title: item.title,
    text: item.description,
    source: props.storyConfig.story.examples[item.example],
    compact: true,
  }));
};

const description = (props: { title?: string; description?: string }) => ({
  type: SectionType.Description,
  text: props.description,
  title: props.title,
});

const importExample = (storyConfig: StoryConfig) => ({
  title: 'Import',
  type: SectionType.ImportExample,
  source: storyConfig.exampleImport,
});

const demo = (props: { demo: React.ElementType }) => {
  const { demo: Demo } = props;

  if (!Demo) {
    return null;
  }
  return {
    title: 'Demo',
    type: SectionType.Demo,
    component: <Demo />,
  };
};

const doDont = (props: { do: string[]; dont: string[] }) => ({
  type: SectionType.DoDont,
  do: {
    list: props.do,
  },
  dont: {
    list: props.dont,
  },
});

const divider = () => ({ type: SectionType.Divider });
const title = (text: string) => ({ type: SectionType.Title, title: text });

const designTab = (props: StoryPageSection, storyConfig: StoryConfig) => {
  const { content } = props;
  return {
    title: 'Design',
    type: SectionType.Tab,
    sections: [
      demo({ demo: props.demo }),
      description({ title: 'Usage', description: content.description }),
      doDont({ do: content.do, dont: content.dont }),
      importExample(storyConfig),
      divider(),
      title('Variations'),
      ...examples({ examples: props.content.featureExamples, storyConfig }),
      title('Common Use Cases'),
      ...examples({
        examples: props.content.commonUseCaseExamples,
        storyConfig,
      }),
      divider(),
      title('Feedback'),
      description({ description: storyConfig.config.feedbackText }),
    ].filter(item => !!item),
  };
};

const apiTab = () => ({
  title: 'API',
  type: SectionType.Tab,
  sections: [
    {
      type: SectionType.Api,
    },
  ],
});

const testkitTab = () => ({
  title: 'Testkit',
  type: SectionType.Tab,
  sections: [
    {
      type: SectionType.Testkit,
    },
  ],
});

const playgroundTab = (props: StoryPageSection, storyConfig: StoryConfig) => ({
  title: 'Playground',
  type: SectionType.Tab,
  sections: [
    {
      type: SectionType.Playground,
    },
  ],
});

const tabs = (props: StoryPageSection, storyConfig: StoryConfig) => {
  const defaultTabs = {
    design: designTab(props, storyConfig),
    api: apiTab(),
    testkit: testkitTab(),
    playground: playgroundTab(props, storyConfig),
  };

  const defaultUserTabsValue = (defaultabs: Tabs) => [
    defaultabs.design,
    defaultabs.api,
    defaultabs.testkit,
  ];

  const { tabs: userTabs = defaultUserTabsValue } = props;

  return userTabs(defaultTabs).reduce((result, tab) => {
    if (!tab.title) {
      return result;
    }

    if (defaultTabs[tab.title.toLowerCase()]) {
      return [...result, defaultTabs[tab.title.toLowerCase()]];
    }

    const pluginSection = tab.node && {
      type: SectionType.Plugin,
      handler: () => tab.node,
    };

    return [
      ...result,
      {
        title: tab.title,
        type: SectionType.Tab,
        sections: [
          ...(tab.sections ? tab.sections : []),
          ...(tab.node ? [pluginSection] : []),
        ],
      },
    ];
  }, [] as TabSection[]);
};

export const storyPage = (
  props: StoryPageSection,
  storyConfig: StoryConfig,
) => [
  {
    type: SectionType.Header,
    sourceUrl: `${storyConfig.config.repoBaseURL}/${storyConfig.storyName}`,
  },
  {
    type: SectionType.Tabs,
    tabs: tabs(props, storyConfig),
  },
];
