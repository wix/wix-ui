import * as React from 'react';

import { CodeSection } from '../../typings/story-section';
const CodeBlock = require('../../CodeBlock').default;

const styles = require('./styles.scss')

export const code: ((a: CodeSection) => React.ReactNode) = ({
  source,
  description,
}) =>
  description ? (
    <div>
      <div className={styles.description}>{description}</div>

      <CodeBlock source={source} />
    </div>
  ) : (
    <CodeBlock source={source} />
  );
