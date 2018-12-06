import * as React from 'react';
import CodeBlock from '../CodeBlock';
import examples from './examples';

const pathInWSR = folder => `wix-style-react/dist/${folder}`;
const capitalize = text => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
const lowerCase = text => `${text.charAt(0).toLowerCase()}${text.slice(1)}`;

const generateCodeExampleForDriver = ({
  driverName,
  driverFilename,
  componentName,
}) => {
  const componentLC = lowerCase(componentName);
  const testkitFactoryName = `${componentLC}TestkitFactory`;
  const capitalizedTestkitFactoryName = `${capitalize(testkitFactoryName)}`;
  const pathToTestkit = pathInWSR('testkit');

  const { type, generate } = examples.find(
    ({ pattern }) => !pattern || pattern.test(driverFilename),
  );

  return {
    type,
    source: generate({
      capitalizedTestkitFactoryName,
      componentLC,
      componentName,
      driverName,
      pathToTestkit,
      testkitFactoryName,
    }),
  };
};

export const CodeExample = ({ driverName, driverFilename, componentName }) => {
  const { source, type } = generateCodeExampleForDriver({
    driverName,
    driverFilename,
    componentName,
  });
  return (
    <span data-hook={`auto-testkit-driver-code-example-${type}`}>
      <CodeBlock source={source} type="jsx" />
    </span>
  );
};
