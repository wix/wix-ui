export default ({
  capitalizedTestkitFactoryName,
  componentLC,
  pathToTestkit,
  testkitFactoryName,
}) => {
  const puppeteerTestkitFactoryName = `puppeteer${capitalizedTestkitFactoryName}`;
  return `
import puppeteer from 'puppeteer';
import {${testkitFactoryName} as ${puppeteerTestkitFactoryName}} from '${pathToTestkit}/puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();

const dataHook = 'myDataHook';
const ${componentLC}Driver = ${puppeteerTestkitFactoryName}({page, dataHook});
await page.goto(testPageUrl);

expect(await ${componentLC}Driver.exists()).toBeTruthy();
`;
};
