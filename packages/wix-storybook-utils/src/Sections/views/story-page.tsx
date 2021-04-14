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
import { SectionType, StoryPageSection } from '../../typings/story-section';
import { StoryConfig } from '../../typings/story-config';
import { Example } from '../../typings/story';
import { sectionWithSiblings } from '../section-with-siblings';
import { importExample as importExampleView } from './import-example';
import { tabs } from './tabs';
import { tab } from './tab';

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

export const storyPage = (
  props: StoryPageSection,
  storyConfig: StoryConfig,
) => {
  const { demo: Demo, content } = props;
  return (
    <>
      {header(storyConfig)}
      {tabs(
        {
          type: SectionType.Tabs,
          tabs: [
            {
              title: 'Design',
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
              type: SectionType.Tab,
            },
            {
              title: 'API',
              sections: [],
              type: SectionType.Tab,
            },
          ],
        },
        storyConfig,
      )}
    </>
  );
};
