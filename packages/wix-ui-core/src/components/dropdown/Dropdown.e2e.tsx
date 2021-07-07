import { browser, element, by, Key } from 'protractor';
import {
    createStoryUrl,
    waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { dropdownTestkitFactory } from '../../testkit/protractor';
import { Category } from '../../../stories/utils';

describe('Input', () => {
    const storyUrl = createStoryUrl({
        kind: Category.COMPONENTS,
        story: 'Dropdown',
    });

    beforeEach(() => {
        browser.get(storyUrl);
    });

    [Key.SPACE, Key.ENTER].forEach((key) => {
        it(`should open and close with ${key} key`, async () => {
            const dataHook = 'storybook-dropdown';
            const driver = dropdownTestkitFactory({ dataHook });
            await waitForVisibilityOf(driver.element(), 'Cannot find Dropdown');

            expect(driver.isContentElementExists()).toBeFalsy();

            const triggerElement = element(by.css('[data-hook="popover-element"]'));

            await triggerElement.sendKeys(key);

            expect(driver.isContentElementExists()).toBeTruthy();

            await triggerElement.sendKeys(key);

            expect(driver.isContentElementExists()).toBeFalsy();
        });
    });
});
