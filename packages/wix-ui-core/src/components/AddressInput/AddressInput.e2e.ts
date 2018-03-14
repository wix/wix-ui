import * as eyes from 'eyes.it';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {addressInputTestkitFactory} from '../../testkit/protractor';
import {browser, $} from 'protractor';

describe('AddressInput', () => {
    const storyUrl = getStoryUrl('Components', 'AddressInputE2E');
    const dataHook = 'storybook-address-input';

    beforeEach(() => browser.get(storyUrl));

    eyes.it('should display and select option', async () => {
        const driver = addressInputTestkitFactory({dataHook});
        const $lagLng = $('[data-hook="lat-lng"]');
        await waitForVisibilityOf(driver.element(), 'Cannot find Input');
        driver.enterText('n');
        driver.dropdownContent().optionAt(0).click();
        await waitForVisibilityOf($lagLng, 'Cannot find lat/lng');
        const latLngTextContent = await $lagLng.getText();
        expect(latLngTextContent).toEqual('{"lat":40.7127753,"lng":-74.0059728}');
    });
});
