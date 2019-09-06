import * as React from 'react';

import { ImportExampleSection } from '../../../typings/story-section';

import { Code } from './Code';

export const importExample: (a: ImportExampleSection) => React.ReactNode = ({
  source,
}) => (typeof source === 'string' ? <Code>{source.trim()}</Code> : source);
