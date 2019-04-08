import * as React from 'react';
import CodeBlock from '../../../CodeBlock';
import templates from '../templates';

import styles from '../../../Sections/section-with-siblings/styles.scss';

const pathInWSR = folder => `wix-style-react/dist/${folder}`;
const lowerCase = text => `${text.charAt(0).toLowerCase()}${text.slice(1)}`;

const generateCodeExampleForDriver = ({ driverName, componentName }) => {
  const testkitFactoryName = `${lowerCase(componentName)}TestkitFactory`;
  const pathToTestkit = pathInWSR('testkit');
  const { title, generate } = templates.find(({ type }) => type === driverName);

  return {
    title,
    source: generate({
      componentName,
      pathToTestkit,
      testkitFactoryName,
    }),
  };
};

export const CodeExample = ({ driverName, componentName }) => {
  const { source, title } = generateCodeExampleForDriver({
    driverName,
    componentName,
  });
  return (
    <div>
      <div className={styles.titles}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.titles}>
        <CodeBlock source={source} type="jsx" />
      </div>
    </div>
  );
};
