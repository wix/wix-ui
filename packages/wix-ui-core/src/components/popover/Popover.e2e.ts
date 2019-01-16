import * as eyes from 'eyes.it';
import {browser} from 'protractor';
import {createStoryUrl, waitForVisibilityOf, scrollToElement} from 'wix-ui-test-utils/protractor';
import * as autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {popoverTestkitFactory} from '../../testkit/protractor';

// Scroll to the bottom of a scrollable container. We assume the container has a `100px` height.
// This utility function is used for the `flip` and `fixed` props tests, as they depeneds on a
// scrollable container in the <Popover/>'s story.
const scrollToBottom = async dataHook => {
  await browser.executeScript(
    `document.querySelector('[data-hook="${dataHook}"]').scrollTop = 100`,
  );
};

describe('Popover', () => {
  const storyUrl = createStoryUrl({
    kind: 'Components',
    story: 'Popover',
    withExamples: true
  });

  const createDriver = async dataHook => {
    const driver = popoverTestkitFactory({ dataHook });

    await waitForVisibilityOf(
      driver.element(),
      `Cannot find Popover component ${dataHook}`,
    );

    await scrollToElement(driver.element());
    return driver;
  };

  beforeAll(() => {
    browser.get(storyUrl)
  });

  beforeEach(async () => {
    await autoExampleDriver.reset();
  });

  eyes.it('should exist', async () => {
    const driver = await createDriver('storybook-popover');

    expect(await driver.element().isPresent()).toBe(true);
    await autoExampleDriver.setProps({shown: true});
  });

  describe('Flip behaviour', () => {
    beforeAll(async () => {
      await createDriver('story-popover-flip-behaviour');
    });

    eyes.it(
      'should flip the popover\'s placements when it overlaps the target element (default)',
      async () => {
        await scrollToBottom('story-popover-flip-enabled');
      }
    );

    eyes.it(
      'should not flip the popover\'s placement when it overlaps the target elements when flip is disabled',
      async () => {
        await scrollToBottom('story-popover-flip-disabled');
      }
    );
  });

  describe('Fixed behaviour', () => {
    beforeAll(async () => {
      await createDriver('story-popover-fixed-behaviour');
    });

    eyes.it('should keep the popover\'s visible when it overflows the container', async () => {
      await scrollToBottom('story-popover-fixed-disabled');
    });

    eyes.it(
      'should not keep the popover\'s visible when it overflows the container when fixed is enabled',
      async () => {
        await scrollToBottom('story-popover-fixed-enabled');
      }
    );
  });
});
