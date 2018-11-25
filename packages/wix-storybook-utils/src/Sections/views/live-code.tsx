import * as React from 'react';

import LiveCodeExample from '../../LiveCodeExample';
import { LiveCodeSection } from '../../typings/story-section';

export const liveCode: ((a: LiveCodeSection) => React.ReactNode) = ({
  source,
  components,
  compact = false,
}) => (
  <LiveCodeExample compact={compact} scope={components} initialCode={source} />
);
