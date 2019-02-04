import * as React from 'react';

const CodeBlock = require('../../CodeBlock').default;
import { ImportExampleSection } from '../../typings/story-section';
const styles = require('./styles.scss');

export const importExample: (a: ImportExampleSection) => React.ReactNode = ({
  source,
}) => (
  <div className={styles.import}>
    <CodeBlock source={source} />
  </div>
);
