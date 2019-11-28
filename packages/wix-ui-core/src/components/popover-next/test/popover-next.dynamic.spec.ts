import * as puppeteer from 'puppeteer';
import { popoverNextTestkitFactory } from '../../../testkit/puppeteer';
import { createStoryUrl } from 'wix-ui-test-utils/protractor';
import { Category } from '../../../../stories/utils';
import { Server } from 'http';

import { startServer } from './utils/server';

describe('PopoverNext - Dynamic Loading', () => {
  const port = 5000;
  let server: Server;
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeEach(async () => {
    server = await startServer(port);
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    // Connect to Chrome DevTools
    const client = await page.target().createCDPSession();

    // Set throttling property
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: (200 * 1024) / 8,
      uploadThroughput: (200 * 1024) / 8,
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

    const contentElement = await testkit.getContentElement();

    expect(await contentElement.textContent).toBe('The content');

    await browser.close();
  });
});
