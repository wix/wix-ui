import * as React from 'react';

import { Metadata } from '../typings/metadata';
import { StoryConfig } from '../typings/story-config';
import { Section, SectionType } from '../typings/story-section';
import merge from 'lodash/merge';

import { View as SectionsView } from '../Sections/view';
import omit from '../AutoExample/utils/omit';

import { createDefaultSections } from '../Sections/create-default-sections';
import { storyPage } from './../Sections/views/story-page';

interface StoryPageProps extends StoryConfig {
  activeTabId?: string;
}

const prepareMetadata: (StoryPageProps) => Metadata = props => ({
  ...props.metadata,
  displayName: props.displayName || props.metadata.displayName,
  props: omit(props.metadata.props)(prop => props.hiddenProps.includes(prop)),
});

const makeSections: (a: StoryPageProps) => Section[] = props =>
  [
    {
      when: props.sections && props.componentPath,
      make: () => merge(createDefaultSections(props), props.sections),
    },

    {
      when: props.sections && !props.componentPath,
      make: () => props.sections,
    },
    {
      when: props.story && props.story.content,
      make: () =>
        storyPage(
          {
            type: SectionType.StoryPage,
            content: props.story.content,
            examples: props.story.examples,
            demo: props.story.demo,
            tabs: props.story.tabs,
          },
          props,
        ),
    },
    {
      // default case
      when: true,
      make: () => createDefaultSections(props),
    },
  ]
    .find(({ when }) => when as boolean)
    .make();

const StoryPage: React.FunctionComponent<StoryPageProps> = (
  props: StoryPageProps,
) => {
  React.useEffect(() => {
    window.sessionStorage.clear();
  }, []);

  return (
    <SectionsView
      {...{
        ...props,
        metadata: prepareMetadata(props),
        sections: makeSections(props),
      }}
    />
  );
};
StoryPage.defaultProps = {
  config: {
    importFormat: '',
    moduleName: '',
    repoBaseURL: '',
  },
  hiddenProps: [],
};

export default StoryPage;
