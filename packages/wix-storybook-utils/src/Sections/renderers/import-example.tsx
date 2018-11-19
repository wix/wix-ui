import * as React from 'react';

const CodeBlock = require('../../CodeBlock').default;
import { ImportExampleSection } from '../../typings/story-section';

export const importExample: ((a: ImportExampleSection) => React.ReactNode) = ({
  source,
}) => <CodeBlock source={source} />;
