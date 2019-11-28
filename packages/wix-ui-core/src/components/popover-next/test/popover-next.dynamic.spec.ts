import * as puppeteer from 'puppeteer';
import * as eventually from 'wix-eventually';
import { popoverNextTestkitFactory } from '../../../testkit/puppeteer';
import { createStoryUrl } from 'wix-ui-test-utils/protractor';
import { Category } from '../../../../stories/utils';
import { Server } from 'http';

import { startServer } from './utils/server';

describe('PopoverNext - Dynamic Loading', () => {
  jest.setTimeout(10000);

  const port = 5000;
  let server: Server;
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeEach(async () => {
    server = await startServer(port);
    browser = await puppeteer.launch();
    page = await browser.newPage();

    // Connect to Chrome DevTools
    const client = await page.target().createCDPSession();

    // Set throttling property
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: (2000 * 1024) / 8,
      uploadThroughput: (20000 * 1024) / 8,
      latency: 20,
    });
  });

  afterEach(async () => {
    server.close();
    await page.close();
    await browser.close();
  });

  it('should simulate dynamically loaded assets', async () => {
    const storyUrl = createStoryUrl({
      kind: Category.COMPONENTS,
      story: 'PopoverNext',
      withExamples: false,
    });

    // Navigate
    await page.goto(`http://localhost:${port}/${storyUrl}`);

    const testkit = await popoverNextTestkitFactory({
      dataHook: 'storybook-popover',
      page,
    });

    expect(await testkit.isContentElementExists()).toBe(false);

    await eventually(async () => {
      expect(await testkit.isContentElementExists()).toBe(true);
    });
  });
});
