import * as React from 'react';

import { ImportExampleSection } from '../../../typings/story-section';

import { Code } from './Code';

export const importExample: (a: ImportExampleSection) => React.ReactNode = ({
  dataHook = '',
  source,
}) =>
  typeof source === 'string' ? (
    <Code data-hook={dataHook}>{source.trim()}</Code>
  ) : (
    source
  );
