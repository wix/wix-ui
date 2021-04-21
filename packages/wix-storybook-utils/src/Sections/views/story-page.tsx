import * as React from 'react';

import {
  SectionType,
  StoryPageSection,
  TabSection,
} from '../../typings/story-section';
import { StoryConfig } from '../../typings/story-config';
import { Example, Tabs } from '../../typings/story';

import { header as headerView } from './header';

import { tabs as tabsView } from './tabs';
import { api } from './api';
import { testkit } from './testkit';
import { playground } from './playground';

const examples = (props: { examples: Example[]; storyConfig: StoryConfig }) => {
  if (!props.examples.length) {
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
  return {
    title: 'Demo',
    type: SectionType.Demo,
    component: <Demo />,
  };
};

const header = (storyConfig: StoryConfig) =>
  headerView(
    {
      type: SectionType.Header,
      sourceUrl: `${storyConfig.config.repoBaseURL}/${storyConfig.storyName}`,
    },
    storyConfig,
  );

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
    ],
  };
};

const apiTab = (props: StoryPageSection, storyConfig: StoryConfig) => ({
  title: 'API',
  type: SectionType.Tab,
  sections: [api(props, storyConfig)],
});

const testkitTab = (props: StoryPageSection, storyConfig: StoryConfig) => ({
  title: 'Testkit',
  type: SectionType.Tab,
  sections: [testkit(props, storyConfig)],
});

const playgroundTab = (props: StoryPageSection, storyConfig: StoryConfig) => ({
  title: 'Playground',
  type: SectionType.Tab,
  sections: [playground(props, storyConfig)],
});

const tabs = (props: StoryPageSection, storyConfig: StoryConfig) => {
  const defaultTabs = {
    design: designTab(props, storyConfig),
    api: apiTab(props, storyConfig),
    testkit: testkitTab(props, storyConfig),
    playground: playgroundTab(props, storyConfig),
  };

  const defaultUserTabsValue = (defaultabs: Tabs) => [
    defaultabs.design,
    defaultabs.api,
    defaultabs.testkit,
  ];

  const { tabs: userTabs = defaultUserTabsValue } = props;

  const outputTabs = userTabs(defaultTabs).reduce((result, tab) => {
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

  return tabsView(
    {
      type: SectionType.Tabs,
      tabs: outputTabs,
    },
    storyConfig,
  );
};

export const storyPage = (
  props: StoryPageSection,
  storyConfig: StoryConfig,
) => {
  return (
    <div data-hook="story-page">
      {header(storyConfig)}
      {tabs(props, storyConfig)}
    </div>
  );
};
