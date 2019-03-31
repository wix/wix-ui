export default ({ componentName, pathToTestkit, testkitFactoryName }) => `
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { ${testkitFactoryName} } from '${pathToTestkit}/protractor';

const dataHook = 'myDataHook';

await browser.get('/page-where-${componentName}-appears');

const testkit = ${testkitFactoryName}({dataHook});

await waitForVisibilityOf(await testkit.getElement());

describe('${componentName} should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
`;
