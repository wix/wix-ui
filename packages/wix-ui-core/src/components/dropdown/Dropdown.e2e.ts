import { browser, element, by, Key } from 'protractor';
import {
    createStoryUrl,
    waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { dropdownTestkitFactory } from '../../testkit/protractor';
import { Category } from '../../../stories/utils';

describe('Dropdown', () => {
    const storyUrl = createStoryUrl({
        kind: 'Base Components',
        story: 'Dropdown',
    });

    beforeEach(() => {
        browser.get(storyUrl);
    });

    [
        { key: Key.SPACE, name: 'space' },
        { key: Key.ENTER, name: 'enter' },
    ].forEach(({ key, name }) => {
        it(`should open and close with ${name} key`, async () => {
            const dataHook = 'storybook-dropdown';
            const driver = dropdownTestkitFactory({ dataHook });
            await waitForVisibilityOf(driver.element(), 'Cannot find Dropdown');

            expect(driver.isContentElementExists()).toBeFalsy();

            const triggerElement = element(by.tagName('button'));

            await triggerElement.sendKeys(key);

            expect(driver.isContentElementExists()).toBeTruthy();

            await triggerElement.sendKeys(key);

            expect(driver.isContentElementExists()).toBeFalsy();
        });
    });
});
