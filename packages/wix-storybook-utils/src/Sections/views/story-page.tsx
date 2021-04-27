import {
  SectionType,
  StoryPageSection,
  TabSection,
} from '../../typings/story-section';
import { StoryConfig } from '../../typings/story-config';
import { Example, Tabs } from '../../typings/story';
import React from 'react';
import { width } from '../../ui/Tabs/core/constants/tab-prop-types';

const examples = (
  examplesContent: Example[],
  examplesCode: Record<string, string>,
) => {
  if (!examplesContent || !examplesContent.length) {
    return [];
  }
  return examplesContent
    .map((item, index) => ({
      type: SectionType.Example,
      key: index,
      title: item.title,
      text: item.description,
      source: examplesCode[item.example],
      compact: true,
      wide: item.wide,
    }))
    .filter(example => example.source);
};

const description = (props: {
  title?: string;
  description?: string;
  width?: string;
}) => ({
  type: SectionType.Description,
  text: props.description,
  title: props.title,
  width,
});

const importExample = (storyConfig: StoryConfig) => ({
  title: 'Import',
  type: SectionType.ImportExample,
  source: storyConfig.exampleImport,
});

const demo = (props: { demo: React.ReactNode }) => {
  const { demo: Demo } = props;

  if (!Demo) {
    return null;
  }
  return {
    title: 'Demo',
    type: SectionType.Demo,
    component: Demo,
  };
};

const doDont = (props: { do: string[]; dont: string[] }) => {
  if (!props.do?.length && !props.dont?.length) {
    return null;
  }
  return {
    type: SectionType.DoDont,
    do: props.do && { list: props.do },
    dont: props.dont && { list: props.dont },
  };
};

const divider = () => ({ type: SectionType.Divider });
const title = (text: string) => ({ type: SectionType.Title, title: text });

const designTab = (props: StoryPageSection, storyConfig: StoryConfig) => {
  const { content } = props;
  const showCommonUseCaseExamples = props.content.commonUseCaseExamples?.length;
  return {
    title: 'Design',
    type: SectionType.Tab,
    sections: [
      demo({ demo: props.demo }),
      description({
        title: 'Usage',
        description: content.description,
        width: '60%',
      }),
      doDont({ do: content.do, dont: content.dont }),
      importExample(storyConfig),
      divider(),
      title('Variations'),
      ...examples(props.content.featureExamples, props.examples),
      showCommonUseCaseExamples && divider(),
      showCommonUseCaseExamples && title('Common Use Cases'),
      ...examples(props.content.commonUseCaseExamples, props.examples),
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
