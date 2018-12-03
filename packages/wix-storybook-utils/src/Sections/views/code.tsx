import * as React from 'react';

import { CodeSection } from '../../typings/story-section';
const CodeBlock = require('../../CodeBlock').default;

export const code: ((a: CodeSection) => React.ReactNode) = ({
  source,
  description,
}) =>
  description ? (
    <div>
      {description}
      <CodeBlock source={source} />
    </div>
  ) : (
    <CodeBlock source={source} />
  );
