import * as React from 'react';
import { description as descriptionView } from './description';
import {
  description as descriptionConfig,
  importExample as importExampleConfig,
} from '../';
import { divider } from './divider';
import { doDont } from './do-dont';
import { example } from './example';
import { header } from './header';
import { title } from './title';
import { tabs } from './tabs';
import { tab } from './tab';
import { SectionType, StoryPageSection } from '../../typings/story-section';
import { StoryConfig } from '../../typings/story-config';
import { Example } from '../../typings/story';
import { sectionWithSiblings } from '../section-with-siblings';
import { importExample as importExampleView } from './import-example';

const examples = (props: Example, storyConfig: StoryConfig) =>
  example(
    {
      type: SectionType.Example,
      title: props.title,
      text: props.description,
      source: storyConfig.story.examples[props.example],
    },
    storyConfig,
  );

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

const importExample = (props: { source: string }, storyConfig: StoryConfig) =>
  sectionWithSiblings(
    importExampleConfig({
      title: 'Import',
    }),
    importExampleView(
      {
        type: SectionType.ImportExample,
        source: props.source,
      },
      storyConfig,
    ),
    true,
  );

const demoExample = (props: { demo: React.ReactNode }) => (
  <div>
    {sectionWithSiblings(
      descriptionConfig({
        title: 'Demo',
        description: '',
      }),
      props.demo,
      true,
    )}
  </div>
);

export const storyPage = (
  props: StoryPageSection,
  storyConfig: StoryConfig,
) => {
  const { demo: Demo, content } = props;
  return (
    <div>
      {tabs(
        {
          type: SectionType.Tabs,
          tabs: [
            tab({
              type: SectionType.Tab,
            }),
          ],
        },
        storyConfig,
      )}
      {header(
        {
          type: SectionType.Header,
          sourceUrl: `${storyConfig.config.repoBaseURL}/${storyConfig.storyName}`,
        },
        storyConfig,
      )}
      {demoExample({ demo: <Demo /> })}
      {description({
        title: 'Usage',
        description: content.description,
      })}
      {doDont(
        {
          do: {
            list: content.do,
          },
          dont: {
            list: content.dont,
          },
          type: SectionType.DoDont,
        },
        storyConfig,
      )}
      {importExample(
        {
          source: storyConfig.exampleImport,
        },
        storyConfig,
      )}
      {!!content.featureExamples.length && divider()}
      {!!content.featureExamples.length &&
        title({ title: 'Customizations', type: SectionType.Title })}
      {content.featureExamples.map(item => examples(item, storyConfig))}
      {!!content.commonUseCaseExamples.length && divider()}
      {!!content.commonUseCaseExamples.length &&
        title({ title: 'Common Use Cases', type: SectionType.Title })}
      {content.commonUseCaseExamples &&
        content.commonUseCaseExamples.map(item => examples(item, storyConfig))}
      {divider()}
      {title({ type: SectionType.Title, title: 'Feedback' })}
      {description({
        description:
          'You can help us improve this component by providing feedback, asking questions or leaving any  other comments via `#wix-style-ux` or `#wix-style-react` Slack channels or GitHub. Found a bug? Please report it to: <a href="https://goo.gl/forms/wrVuHnyBrEISXUPF2" target="_blank">goo.gl/forms/wrVuHnyBrEISXUPF2</a>',
      })}
    </div>
  );
};
