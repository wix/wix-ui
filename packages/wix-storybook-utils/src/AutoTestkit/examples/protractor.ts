export default ({
  capitalizedTestkitFactoryName,
  componentLC,
  pathToTestkit,
  testkitFactoryName,
}) => {
  const protractorTestkitFactoryName = `protractor${capitalizedTestkitFactoryName}`;
  return `
import {waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {${testkitFactoryName} as ${protractorTestkitFactoryName}} from '${pathToTestkit}/protractor';

await browser.get(testPageUrl);

const dataHook = 'myDataHook';
const ${componentLC}Driver = ${protractorTestkitFactoryName}({dataHook});

await waitForVisibilityOf(${componentLC}Driver.getElement());
expect(await ${componentLC}Driver.exists()).toBeTruthy();
  `;
};
