import * as React from 'react';

import { description as descriptionView } from './description';
import { demo as demoView } from './demo';
import {
  description as descriptionConfig,
  importExample as importExampleConfig,
} from '../';
import { divider } from './divider';
import { doDont as doDontView } from './do-dont';
import { example as exampleView } from './example';
import { header as headerView } from './header';
import { title } from './title';
import {
  SectionType,
  StoryPageSection,
  TabSection,
} from '../../typings/story-section';
import { Tabs } from '../../typings/story';
import { plugin } from './plugin';
import { StoryConfig } from '../../typings/story-config';
import { Example } from '../../typings/story';
import { sectionWithSiblings } from '../section-with-siblings';
import { importExample as importExampleView } from './import-example';
import { tabs as tabsView } from './tabs';
import { api } from './api';
import { testkit } from './testkit';
import { playground } from './playground';

const examples = (props: {
  title: string;
  examples: Example[];
  storyConfig: StoryConfig;
}) => {
  if (!props.examples.length) {
    return null;
  }

  return (
    <>
      {divider()}
      {title({ type: SectionType.Title, title: props.title })}
      {props.examples.map(item =>
        exampleView(
          {
            type: SectionType.Example,
            title: item.title,
            text: item.description,
            source: props.storyConfig.story.examples[item.example],
          },
          props.storyConfig,
        ),
      )}
    </>
  );
};

const description = (props: { title?: string; description: string }) =>
  sectionWithSiblings(
    descriptionConfig({
      title: props.title,
      description: '',
    }),
    descriptionView({
      type: SectionType.Description,
      text: props.description,
    }),
    true,
  );

const importExample = (storyConfig: StoryConfig) =>
  sectionWithSiblings(
    importExampleConfig({
      title: 'Import',
    }),
    importExampleView(
      {
        type: SectionType.ImportExample,
        source: storyConfig.exampleImport,
      },
      storyConfig,
    ),
    true,
  );

const demo = (props: { demo: React.ReactNode }) => (
  <div>
    {sectionWithSiblings(
      descriptionConfig({
        title: 'Demo',
        description: '',
      }),
      demoView({
        type: SectionType.Demo,
        component: props.demo,
      }),
      true,
    )}
  </div>
);

const header = (storyConfig: StoryConfig) =>
  headerView(
    {
      type: SectionType.Header,
      sourceUrl: `${storyConfig.config.repoBaseURL}/${storyConfig.storyName}`,
    },
    storyConfig,
  );

const doDont = (props: { do: string[]; dont: string[] }) =>
  doDontView({
    type: SectionType.DoDont,
    do: {
      list: props.do,
    },
    dont: {
      list: props.dont,
    },
  });

const feedback = (storyConfig: StoryConfig) => {
  return (
    <>
      {divider()}
      {title({ type: SectionType.Title, title: 'Feedback' })}
      {description({
        description: storyConfig.config.feedbackText,
      })}
    </>
  );
};

const designTab = (props: StoryPageSection, storyConfig: StoryConfig) => {
  const { demo: Demo, content } = props;
  return {
    title: 'Design',
    type: SectionType.Tab,
    sections: [
      demo({ demo: <Demo /> }),
      description({
        title: 'Usage',
        description: content.description,
      }),
      doDont({ do: content.do, dont: content.dont }),
      importExample(storyConfig),
      examples({
        title: 'Variations',
        examples: content.featureExamples,
        storyConfig,
      }),
      examples({
        title: 'Common Use Cases',
        examples: content.commonUseCaseExamples,
        storyConfig,
      }),
      feedback(storyConfig),
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
  const availableTabs = {
    design: designTab(props, storyConfig),
    api: apiTab(props, storyConfig),
    testkit: testkitTab(props, storyConfig),
    playground: playgroundTab(props, storyConfig),
  };

  const {
    tabs: userTabs = (defaultabs: Tabs) => [
      defaultabs.design,
      defaultabs.api,
      defaultabs.testkit,
    ],
  } = props;

  const outputTabs = userTabs(availableTabs as any).reduce((result, tab) => {
    if (availableTabs[tab.title]) {
      return result.concat(availableTabs[tab.title]);
    }
    return result.concat({
      title: tab.title,
      type: SectionType.Tab,
      sections: [
        tab.sections,
        {
          type: SectionType.Plugin,
          sections: [
            plugin(
              { type: SectionType.Plugin, handler: () => tab.node },
              storyConfig,
            ),
          ],
        },
      ],
    });
  }, []) as TabSection[];

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
) => (
  <>
    {header(storyConfig)}
    {tabs(props, storyConfig)}
  </>
);

