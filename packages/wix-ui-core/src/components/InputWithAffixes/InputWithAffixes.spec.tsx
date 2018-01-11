import * as React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils';
import InputWithAffixes from './';
import {inputWithAffixesDriverFactory} from './InputWithAffixes.driver';

describe('InputWithAffixes', () => {
    const createDriver = createDriverFactory(inputWithAffixesDriverFactory);

    it('renders with no prefix or suffix', () => {
        const driver = createDriver(<InputWithAffixes/>);
        expect(driver.exists()).toBeTruthy();
    });
});
