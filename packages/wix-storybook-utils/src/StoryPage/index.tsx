import * as React from 'react';

import { Metadata } from '../typings/metadata';
import { StoryConfig } from '../typings/story-config';

import { SingleComponentLayout } from './single-component-layout';
import { View as SectionsView } from '../Sections/view';
const omit = require('../AutoExample/utils/omit').default;

interface StoryPageProps extends StoryConfig {
  activeTabId?: string;
}

const prepareMetadata: ((StoryPageProps) => Metadata) = props => ({
  ...props.metadata,
  displayName: props.displayName || props.metadata.displayName,
  props: omit(props.metadata.props)(prop => props.hiddenProps.includes(prop)),
});

const StoryPage: React.StatelessComponent<StoryPageProps> = (
  props: StoryPageProps,
) => {
  const passThrough: StoryConfig = {
    ...props,
    metadata: prepareMetadata(props),
  };

  return props.sections ? (
    <SectionsView {...passThrough} />
  ) : (
    <SingleComponentLayout {...passThrough} />
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
