import * as React from 'react';
import {dividerDriverFactory} from './Divider.driver';
import {createDriverFactory} from 'wix-ui-test-utils';

import Divider from './index';

describe('Divider', () => {

    const createDriver = createDriverFactory(dividerDriverFactory);

    it('renders to the screen', () => {
        const driver = createDriver(<Divider />);

        expect(driver.exists()).toBe(true);
    });

    it('is horizontal by default', () => {
        const driver = createDriver(<Divider />);

        expect(driver.isVertical()).toBe(false);
    });

    it('is vertical', () => {
        const driver = createDriver(<Divider vertical />);

        expect(driver.isVertical()).toBe(true);
    });

    it('renders custom divider', () => {
        const customDivider = 'Custom Divider';
        const driver = createDriver(<Divider><span>{customDivider}</span></Divider>);

        expect(driver.textContent()).toEqual(customDivider);
    });
});
