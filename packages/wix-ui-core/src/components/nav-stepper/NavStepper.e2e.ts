import { browser } from 'protractor';
import * as eyes from 'eyes.it';
import { getStoryUrl, waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { navStepperTestkitFactory } from '../../testkit/protractor';
import { Category } from '../../../stories/utils';

describe('NavStepper', () => {
  const storyUrl = getStoryUrl(Category.COMPONENTS, 'NavStepper');

  beforeEach(() => browser.get(storyUrl));

  eyes.it('renders all states of steps', async () => {
    const navStepper = navStepperTestkitFactory({
      dataHook: 'storybook-navstepper',
    });
    await waitForVisibilityOf(navStepper.element(), 'Cannot find Pagination');
    expect(true).toBe(true);
  });
});
