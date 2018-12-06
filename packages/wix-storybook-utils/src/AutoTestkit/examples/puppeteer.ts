export default ({
  capitalizedTestkitFactoryName,
  pathToTestkit,
  testkitFactoryName,
}) => {
  const puppeteerTestkitFactoryName = `puppeteer${capitalizedTestkitFactoryName}`;
  return `
import puppeteer from 'puppeteer';
import {${testkitFactoryName} as ${puppeteerTestkitFactoryName}} from '${pathToTestkit}/puppeteer';

// puppeteer setup
const browser = await puppeteer.launch();
const page = await browser.newPage();

// Create an element testkit via the data-hook attribute
const testkit = await inputTestkitFactory({dataHook: 'myDataHook', page});
await page.goto(appUrl); // Your application url

expect(await testkit.getText()).to.equal('my test');
`;
};
