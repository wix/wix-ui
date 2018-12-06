export default ({
  capitalizedTestkitFactoryName,
  componentLC,
  componentName,
  driverName,
  pathToTestkit,
  testkitFactoryName,
}) => {
  const enzymeTestkitFactoryName = `enzyme${capitalizedTestkitFactoryName}`;
  return `
import React from 'react';
import {mount} from 'enzyme';
import {${testkitFactoryName}} from '${pathToTestkit}';
import {${testkitFactoryName} as ${enzymeTestkitFactoryName}} from '${pathToTestkit}/enzyme';

const dataHook = 'myDataHook';

/***************
 enzyme example
***************/

const wrapper = mount(<${componentName} dataHook={dataHook} />);
const ${componentLC}Driver = ${enzymeTestkitFactoryName}({wrapper, dataHook});

expect(${componentLC}Driver.${
    driverName ? `${driverName}.` : ''
  }exists()).toBeTruthy();

/**********************
 ReactTestUtils example
**********************/

const div = document.createElement('div');
const wrapper = div.appendChild(
  ReactTestUtils.renderIntoDocument(<${componentName} />, {dataHook})
);

const ${componentLC}Driver = ${testkitFactoryName}({wrapper, dataHook});

expect(${componentLC}Driver.${
    driverName ? `${driverName}.` : ''
  }exists()).toBeTruthy();
  `;
};
