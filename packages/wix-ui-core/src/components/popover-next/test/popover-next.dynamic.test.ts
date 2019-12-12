import * as puppeteer from 'puppeteer';
import * as eventually from 'wix-eventually';
import { testkit } from '../../popover/Popover.uni.driver';

import { Server } from 'http';

import { puppeteerUniTestkitFactoryCreator } from 'wix-ui-test-utils/puppeteer';
const popoverNextTestkitFactory = puppeteerUniTestkitFactoryCreator(testkit);

import { storySettings } from '../docs/storySettings';

import { startServer } from './server';

describe('PopoverNext - Dynamic Loading', () => {
  jest.setTimeout(20000);

  const port = 5000;
  let server: Server;
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  const storyUrl = `/iframe?id=components--popovernext`;

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
   * This test represents a situation where content chunk is not yet loaded
   *  and our testkit method that tries to find the content will return false if asked immediately
   */
  it('should simulate dynamically loaded assets with testkit chunk await', async () => {
    // Navigate
    await page.goto(`http://localhost:${port}/${storyUrl}`);
    console.log(storyUrl);
    const popoverTestkit = await popoverNextTestkitFactory({
      dataHook: storySettings.dataHook,
      page,
    });

    expect(await popoverTestkit.isTargetElementExists()).toBe(true);
    expect(await popoverTestkit.isContentElementExists()).toBe(false);
  });

  /**
   * This test represents a recommended pattern testing against production
   *
   */
  it('should simulate dynamically loaded assets without chunk await', async () => {
    // Navigate
    await page.goto(`http://localhost:${port}/${storyUrl}`);

    const popoverTestkit = await popoverNextTestkitFactory({
      dataHook: storySettings.dataHook,
      page,
    });

    expect(await popoverTestkit.isTargetElementExists()).toBe(true);
    expect(await popoverTestkit.isContentElementExists()).toBe(false);

    await eventually(async () => {
      expect(await popoverTestkit.isContentElementExists()).toBe(true);
    });
  });
});
