const puppeteer = require('puppeteer');

const colorRed = '\x1b[31m';
const colorReset = '\x1b[0m';

module.exports = async (url) => {
  const browser = await puppeteer.launch({headless: true});
  const [page] = await browser.pages();
  await page.setViewport({
    width: 800,
    height: 600,
    deviceScaleFactor: 1
  });
  page.on('console', async msg => {
    const args = await Promise.all(msg.args().map(a => a.jsonValue()));
    console.log(...args);
  });
  page.on('pageerror', err => {
    console.error(colorRed + err + colorReset);
    process.exit(1);
  });
  page.on('dialog', dialog => dialog.dismiss());
  await page.goto(url);
  await page.waitForFunction(() => '__MOCHA_RESULT__' in window);
  const failures = await page.evaluate('window.__MOCHA_RESULT__');
  await browser.close();
  return failures;
};
