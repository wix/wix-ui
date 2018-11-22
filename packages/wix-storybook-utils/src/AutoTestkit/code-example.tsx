import * as React from 'react';
import CodeBlock from '../CodeBlock';

const fromWSR = folder => `from 'wix-style-react/dist/${folder}'`;
const capitalize = text => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
const lowerCase = text => `${text.charAt(0).toLowerCase()}${text.slice(1)}`;

export const CodeExample = ({ driverName, componentName }) => {
  const componentLC = lowerCase(componentName);
  const testkitFactoryName = `${componentLC}TestkitFactory`;

  const enzymeTestkitFactoryName = `enzyme${capitalize(testkitFactoryName)}`;

  const source = `
import React from 'react';
import {mount} from 'enzyme';
import {${testkitFactoryName}} ${fromWSR('testkit')}
import {${testkitFactoryName} as ${enzymeTestkitFactoryName}} ${fromWSR(
    'testkit/enzyme',
  )};

const dataHook = 'myDataHook';
const wrapper = mount(<${componentName} dataHook={dataHook}></${componentName}>);
const ${componentLC}Driver = ${enzymeTestkitFactoryName}({wrapper, dataHook});

expect(${componentLC}Driver.${
    driverName ? `${driverName}.` : ''
  }exists()).toBeTruthy();
`;
  return <CodeBlock source={source} type="jsx" />;
};
