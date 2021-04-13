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
import { SectionType, StoryPageSection } from '../../typings/story-section';
import { StoryConfig } from '../../typings/story-config';
import { Example } from '../../typings/story';
import { sectionWithSiblings } from '../section-with-siblings';
import { importExample as importExampleView } from './import-example';

const createExamplesFactory = (storyConfig: StoryConfig) => (props: Example) =>
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

const importExample = (props: { source: string }) =>
  sectionWithSiblings(
    importExampleConfig({}),
    importExampleView({
      type: SectionType.ImportExample,
      source: props.exampleImport,
    }),
  );

export const storyPage = (
  props: StoryPageSection,
  storyConfig: StoryConfig,
) => {
  const renderExamples = createExamplesFactory(storyConfig);
  return (
    <div>
      {header(
        {
          type: SectionType.Header,
          sourceUrl: `${storyConfig.config.repoBaseURL}/${storyConfig.storyName}`,
        },
        storyConfig,
      )}

      {description({
        title: 'Description',
        description: props.content.description,
      })}

      {doDont(
        {
          do: {
            list: props.content.do,
          },
          dont: {
            list: props.content.dont,
          },
          type: SectionType.DoDont,
        },
        storyConfig,
      )}

      {importExample(
        {
          type: SectionType.ImportExample,
          source: storyConfig.exampleImport,
        },
        storyConfig,
      )}

      {!!props.content.featureExamples.length && divider()}
      {!!props.content.featureExamples.length &&
        title({ title: 'Customizations', type: SectionType.Title })}
      {props.content.featureExamples.map(renderExamples)}

      {!!props.content.commonUseCaseExamples.length && divider()}
      {!!props.content.commonUseCaseExamples.length &&
        title({ title: 'Common Use Cases', type: SectionType.Title })}
      {props.content.commonUseCaseExamples &&
        props.content.commonUseCaseExamples.map(renderExamples)}

      {divider()}
      {title({ type: SectionType.Title, title: 'Feedback' })}
      {description({
        description:
          'You can help us improve this component by providing feedback, asking questions or leaving any  other comments via `#wix-style-ux` or `#wix-style-react` Slack channels or GitHub. Found a bug? Please report it to: <a href="https://goo.gl/forms/wrVuHnyBrEISXUPF2" target="_blank">goo.gl/forms/wrVuHnyBrEISXUPF2</a>',
      })}
    </div>
  );
};
