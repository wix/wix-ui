import * as puppeteer from 'puppeteer';
import * as eventually from 'wix-eventually';
import { popoverNextTestkitFactory } from '../../../testkit/puppeteer';
import { createStoryUrl } from 'wix-ui-test-utils/protractor';
import { Category } from '../../../../stories/utils';
import { Server } from 'http';

import { startServer } from './utils/server';

describe('PopoverNext - Dynamic Loading', () => {
  jest.setTimeout(20000);

  const port = 5000;
  let server: Server;
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeEach(async () => {
    server = await startServer(port);
    browser = await puppeteer.launch();
    page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', request => {
      const chunk = request.url().replace(`http://localhost:${port}/`, '');
      if (chunk.match(/^[0-9]{1,4}\./)) {
        setTimeout(() => request.continue(), 5000);
      } else {
        return request.continue();
      }
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
    await page.goto(`http://localhost:${port}/${storyUrl}`, {
      waitUntil: 'networkidle2',
    });

    const testkit = await popoverNextTestkitFactory({
      dataHook: 'storybook-popover',
      page,
    });

    expect(await testkit.isTargetElementExists()).toBe(true);
    expect(await testkit.isContentElementExists()).toBe(false);

    await eventually(async () => {
      expect(await testkit.isContentElementExists()).toBe(true);
    });
  });
});
