import * as eyes from 'eyes.it';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {addressInputTestkitFactory} from '../../testkit/protractor';
import {browser, $} from 'protractor';

fdescribe('AddressInput', () => {
    const storyUrl = getStoryUrl('Components', 'AddressInputE2E');
    const dataHook = 'storybook-addressInput';

    beforeEach(() => browser.get(storyUrl));

    eyes.it('should render', () => {
        const driver = addressInputTestkitFactory({dataHook});

        expect(driver.element()).toBeDefined();
    });

    eyes.it('should display and select option', async () => {
        const driver = addressInputTestkitFactory({dataHook});
        const $lagLng = $('[data-hook="lat-lng"]');
        await waitForVisibilityOf(driver.element(), 'Cannot find Input');
        driver.enterText('n');
        driver.selectOption(0);
        await waitForVisibilityOf($lagLng, 'Cannot find lat/lng');
        const latLngTextContent = await $lagLng.getText();
        expect(latLngTextContent).toEqual('{"lat":40.7127753,"lng":-74.0059728}');
    });
});
