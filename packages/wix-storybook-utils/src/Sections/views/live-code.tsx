import * as React from 'react';

const LiveCodeExample = require('../../LiveCodeExample').default;
import { LiveCodeSection } from '../../typings/story-section';

export const liveCode: (a: LiveCodeSection) => React.ReactNode = ({
  source,
  components,
  previewProps,
  compact = false,
}) => (
  <LiveCodeExample
    previewProps={previewProps}
    compact={compact}
    scope={components}
    initialCode={source}
  />
);
