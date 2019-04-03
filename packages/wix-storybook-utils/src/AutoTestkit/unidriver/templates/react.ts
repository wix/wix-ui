export default ({ componentName, pathToTestkit, testkitFactoryName }) => `
import React from 'react';
import { renderIntoDocument } from 'react-dom/test-utils';
import ${componentName} from 'wix-style-react/${componentName}';
import { ${testkitFactoryName} } from '${pathToTestkit}';

const div = document.createElement('div');
const dataHook = 'myDataHook';

const component = (
  <div>
    <${componentName} dataHook={dataHook} />
  </div>
);

const wrapper = div.appendChild(
  renderIntoDocument(component, { dataHook })
);

const testkit = ${testkitFactoryName}({ wrapper, dataHook });

describe('${componentName} should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
  `;
