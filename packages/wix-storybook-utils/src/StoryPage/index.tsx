import * as React from 'react';

import { Metadata } from '../typings/metadata';
import { StoryConfig } from '../typings/story-config';

import { View as SectionsView } from '../Sections/view';
import omit from '../AutoExample/utils/omit';

import { createDefaultSections } from '../Sections/create-default-sections';

interface StoryPageProps extends StoryConfig {
  activeTabId?: string;
}

const prepareMetadata: (StoryPageProps) => Metadata = props => ({
  ...props.metadata,
  displayName: props.displayName || props.metadata.displayName,
  props: omit(props.metadata.props)(prop => props.hiddenProps.includes(prop)),
});

const StoryPage: React.FunctionComponent<StoryPageProps> = (
  props: StoryPageProps,
) => (
  <SectionsView
    {...{
      ...props,
      metadata: prepareMetadata(props),
      sections: props.sections || createDefaultSections(props),
    }}
  />
);

StoryPage.defaultProps = {
  config: {
    importFormat: '',
    moduleName: '',
    repoBaseURL: '',
  },
  hiddenProps: [],
};

export default StoryPage;
