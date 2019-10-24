import { browser } from 'protractor';
import * as eyes from 'eyes.it';
import {
  createStoryUrl,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { navStepperTestkitFactory } from '../../testkit/protractor';
import { Category } from '../../../stories/utils';

describe('NavStepper', () => {
  const storyUrl = createStoryUrl({
    kind: Category.COMPONENTS,
    story: 'NavStepper',
  });

  beforeEach(() => browser.get(storyUrl));

  eyes.it('renders all states of steps', async () => {
    const navStepper = navStepperTestkitFactory({
      dataHook: 'storybook-navstepper',
    });
    await waitForVisibilityOf(navStepper.element(), 'Cannot find Pagination');
    expect(true).toBe(true);
  });
});
