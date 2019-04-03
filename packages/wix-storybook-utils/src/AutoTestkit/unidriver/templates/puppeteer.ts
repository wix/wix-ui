export default ({ pathToTestkit, componentName, testkitFactoryName }) => `
import puppeteer from 'puppeteer';
import { ${testkitFactoryName} } from '${pathToTestkit}/puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto('/page-where-${componentName}-appears');

const testkit = ${testkitFactoryName}({ dataHook: 'myDataHook', page });

describe('${componentName} should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
})
`;
