import * as puppeteer from 'puppeteer';
import * as eventually from 'wix-eventually';
import { popoverNextPrivateDriverFactoryUni } from './popover-next.private.uni.driver';
import { createStoryUrl } from 'wix-ui-test-utils/protractor';
import { Category } from '../../../../stories/utils';
import { Server } from 'http';

import { puppeteerUniTestkitFactoryCreator } from 'wix-ui-test-utils/puppeteer';

const popoverNextTestkitFactory = puppeteerUniTestkitFactoryCreator(
  popoverNextPrivateDriverFactoryUni,
);

import { startServer } from './utils/server';

describe('PopoverNext - Dynamic Loading', () => {
  jest.setTimeout(20000);

  const port = 5000;
  let server: Server;
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  const storyUrl = createStoryUrl({
    kind: Category.COMPONENTS,
    story: 'PopoverNext',
    withExamples: false,
  });

  beforeAll(async () => {
    /**
     * running production based storybook server that has dynamic loading working
     * */
    server = await startServer(port);
  });

  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    await page.setRequestInterception(true);

    /**
     * we manually timeout chunk onload so simulate network threshold
     */
    page.on('request', request => {
      const chunk = request.url().replace(`http://localhost:${port}/`, '');
      if (chunk.match(/^[0-9]{1,4}\./)) {
        setTimeout(() => request.continue(), 500);
      } else {
        return request.continue();
      }
    });
  });

  afterEach(async () => {
    await page.close();
    await browser.close();
  });

  afterAll(async () => {
    server.close();
  });

  /**
   * This test is running against Popvoer that has shown={true} by default
   */
  it('should simulate dynamically loaded assets without chunk await', async () => {
    // Navigate
    await page.goto(`http://localhost:${port}/${storyUrl}`);

    const testkit = await popoverNextTestkitFactory({
      dataHook: 'storybook-popover',
      page,
    });

    expect(await testkit.isTargetElementExists()).toBe(true);
    expect(await testkit.isContentElementExistsWithoutChunkAwait()).toBe(false);

    await eventually(async () => {
      expect(await testkit.isContentElementExistsWithoutChunkAwait()).toBe(
        true,
      );
    });
  });

  /**
   * This test is running against Popvoer that has shown={true} by default
   */
  it('should simulate dynamically loaded assets with testkit chunk await', async () => {
    // Navigate
    await page.goto(`http://localhost:${port}/${storyUrl}`);

    const testkit = await popoverNextTestkitFactory({
      dataHook: 'storybook-popover',
      page,
    });

    expect(await testkit.isTargetElementExists()).toBe(true);
    expect(await testkit.isContentElementExists()).toBe(true);
  });
});
