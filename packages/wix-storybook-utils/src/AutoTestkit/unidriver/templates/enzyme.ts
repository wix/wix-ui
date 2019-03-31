export default ({ componentName, testkitFactoryName, pathToTestkit }) => `
import React from 'react';
import { mount } from 'enzyme';
import ${componentName} from 'wix-style-react/Button';
import { ${testkitFactoryName} } from '${pathToTestkit}/enzyme';

const dataHook = 'myDataHook';

const wrapper = mount(
  <div>
    <${componentName} dataHook={dataHook} />
  </div>
);

const testkit = ${testkitFactoryName}({ wrapper, dataHook });

describe('${componentName} should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
`;
