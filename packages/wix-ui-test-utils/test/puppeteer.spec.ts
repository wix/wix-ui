import * as puppeteer from 'puppeteer';
import {UniDriver} from '@unidriver/core';

import {puppeteerUniTestkitFactoryCreator as makeTestkit} from '../src/puppeteer';
import {baseUniDriverFactory} from '../src/base-driver';

const mockTestkit = (base: UniDriver) => {
  return {
    ...baseUniDriverFactory(base),
    text: () => base.text(),
    getTestAttr: () => base.attr('data-test')
  };
};

const mockHtml = `
<html>
  <body>
    <div data-hook="dataHook">content</div>
  </body>
</html>
`.trim();

const mockNestedHtml = `
  <html>
    <body>
      <div data-hook="dataHook">fake content</div>
      <div data-hook="wrapper">
        <div data-test="skip-me">
          <div data-test="find-me" data-hook="dataHook">
            real content
          </div>
        </div>
      </div>
    </body>
  </html>
`.trim();

describe('puppeteerUniTestkitFactoryCreator', () => {
  let browser: puppeteer.Browser, page: puppeteer.Page;
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should return testkit factory which returns testkit instance', async () => {
    page.setContent(mockHtml);
    const testkitFactory = makeTestkit(mockTestkit);
    const testkit = await testkitFactory({
      page,
      dataHook: 'dataHook'
    });

    expect(testkit).toEqual(
      expect.objectContaining({
        exists: expect.any(Function),
        element: expect.any(Function),
        click: expect.any(Function)
      })
    );

    expect(await testkit.text()).toEqual('content');
  });

  describe('`wrappper`', () => {
    it('should return testkit factory which returns testkit instance', async () => {
      page.setContent(mockNestedHtml);
      const testkitFactory = makeTestkit(mockTestkit);
      const testkit = await testkitFactory({
        page,
        dataHook: 'dataHook',
        wrapper: await page.$('[data-hook="wrapper"]')
      });

      expect((await testkit.text()).trim()).toEqual('real content');
      expect(await testkit.getTestAttr()).toEqual('find-me');
    });
  });
});
